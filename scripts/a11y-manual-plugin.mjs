// Vite dev-server plugin: stores the manual accessibility checklist state
// (resolved flag + comment per item) in src/a11y/manual/<route-slug>.json.
//
//   GET  /__a11y/manual/<slug>  -> { items: { [itemId]: { resolved, accepted, comment, updatedAt } } }
//   POST /__a11y/manual/<slug>  -> body { itemId, resolved, accepted?, comment }
//
// resolved and accepted are mutually exclusive. An accepted item must have a comment (the reason).
//
// Development only (apply: 'serve'). Rejects non-loopback clients and cross-origin
// requests, validates every field, and caps body and comment size.
import fs from 'node:fs';
import path from 'node:path';

const SLUG_RE = /^[a-z0-9-]{1,64}$/;
const ITEM_RE = /^[a-z0-9._-]{1,120}$/;
const MAX_COMMENT = 2000;
const MAX_BODY_BYTES = 8 * 1024;
const LOOPBACK_ADDRESSES = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);
const LOOPBACK_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]']);

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function sameLocalOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin GETs and non-browser clients send no Origin
  try {
    return LOOPBACK_HOSTNAMES.has(new URL(origin).hostname);
  } catch {
    return false;
  }
}

function readFileSafe(file) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return data && typeof data.items === 'object' && data.items ? data : { items: {} };
  } catch {
    return { items: {} };
  }
}

export function a11yManualStore(root) {
  const dir = path.join(root, 'src', 'a11y', 'manual');

  return {
    name: 'a11y-manual-store',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__a11y/manual', async (req, res) => {
        if (!LOOPBACK_ADDRESSES.has(req.socket.remoteAddress ?? '') || !sameLocalOrigin(req)) {
          return send(res, 403, { error: 'Forbidden' });
        }

        const slug = (req.url ?? '').split('?')[0].replace(/^\//, '');
        if (!SLUG_RE.test(slug)) return send(res, 400, { error: 'Invalid request' });
        const file = path.join(dir, `${slug}.json`);

        if (req.method === 'GET') return send(res, 200, readFileSafe(file));

        if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
        if (!String(req.headers['content-type'] ?? '').startsWith('application/json')) {
          return send(res, 415, { error: 'Invalid request' });
        }

        let payload;
        try {
          payload = JSON.parse(await readBody(req));
        } catch {
          return send(res, 400, { error: 'Invalid request' });
        }

        const { itemId, resolved, comment } = payload ?? {};
        const accepted = payload?.accepted ?? false;
        if (
          typeof itemId !== 'string' || !ITEM_RE.test(itemId) ||
          typeof resolved !== 'boolean' ||
          typeof accepted !== 'boolean' || (resolved && accepted) ||
          typeof comment !== 'string' || comment.length > MAX_COMMENT ||
          (accepted && comment.trim() === '')
        ) {
          return send(res, 400, { error: 'Invalid request' });
        }

        try {
          const data = readFileSafe(file);
          if (!resolved && !accepted && comment.trim() === '') {
            delete data.items[itemId];
          } else {
            data.items[itemId] = { resolved, accepted, comment, updatedAt: new Date().toISOString() };
          }
          fs.mkdirSync(dir, { recursive: true });
          const tmp = `${file}.tmp`;
          fs.writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`);
          fs.renameSync(tmp, file);
          return send(res, 200, { item: data.items[itemId] ?? null });
        } catch (error) {
          server.config.logger.error(`[a11y-manual-store] write failed: ${error.message}`);
          return send(res, 500, { error: 'Could not save' });
        }
      });
    },
  };
}
