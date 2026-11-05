import { useCallback, useEffect, useRef, useState } from 'react';

// Committed manual-checklist state, used read-only in production builds.
const committed = import.meta.glob('./manual/*.json', { eager: true, import: 'default' });

const ENDPOINT = '/__a11y/manual';

/**
 * Loads and saves the manual checklist state for one component page.
 *
 * Dev server : read and write through the Vite plugin (scripts/a11y-manual-plugin.mjs),
 *              which stores src/a11y/manual/<slug>.json.
 * Production : read-only from the committed JSON.
 *
 * Returns { items, status, error, canSave, save }
 *   items   { [itemId]: { resolved, accepted, comment, updatedAt } }
 *   status  'loading' | 'ready'
 *   save    (itemId, { resolved, accepted, comment }) => Promise<boolean>
 */
export function useManualState(slug) {
  const canSave = import.meta.env.DEV;
  const [items, setItems] = useState({});
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const latest = useRef(items);
  latest.current = items;

  useEffect(() => {
    let cancelled = false;
    if (!canSave) {
      setItems(committed[`./manual/${slug}.json`]?.items ?? {});
      setStatus('ready');
      return undefined;
    }
    fetch(`${ENDPOINT}/${slug}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (cancelled) return;
        setItems(data.items ?? {});
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setError('Could not load saved checklist state. Is the dev server running?');
        setStatus('ready');
      });
    return () => { cancelled = true; };
  }, [slug, canSave]);

  const save = useCallback(async (itemId, { resolved, accepted = false, comment }) => {
    const previous = latest.current[itemId];
    const optimistic = { resolved, accepted, comment, updatedAt: new Date().toISOString() };
    const empty = !resolved && !accepted && comment.trim() === '';

    setItems((current) => {
      const next = { ...current };
      if (empty) delete next[itemId]; else next[itemId] = optimistic;
      return next;
    });
    setError(null);

    try {
      const res = await fetch(`${ENDPOINT}/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, resolved, accepted, comment }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { item } = await res.json();
      setItems((current) => {
        const next = { ...current };
        if (item) next[itemId] = item; else delete next[itemId];
        return next;
      });
      return true;
    } catch {
      // Roll back so the screen never shows something that was not stored.
      setItems((current) => {
        const next = { ...current };
        if (previous) next[itemId] = previous; else delete next[itemId];
        return next;
      });
      setError('Could not save. Your change was not stored.');
      return false;
    }
  }, [slug]);

  return { items, status, error, canSave, save };
}
