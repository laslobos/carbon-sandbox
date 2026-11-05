import React, { useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Button,
  ContentSwitcher,
  InlineNotification,
  Link,
  RadioButton,
  RadioButtonGroup,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TextArea,
} from '@carbon/react';
import { CheckmarkFilled, ErrorFilled, Information, WarningAltFilled } from '@carbon/icons-react';
import {
  CATEGORIES,
  MANUAL_STALE_AFTER_DAYS,
  buildChecklist,
  itemStatus,
  slugForScan,
  toolItemId,
} from '../a11y/checklist';
import { useManualState } from '../a11y/useManualState';
import './AccessibilityPanel.scss';

/**
 * AccessibilityPanel
 *
 * One status block per component page:
 *   Automated tab – axe-core + IBM Equal Access results, split into Failed / Needs review / Passed.
 *   Manual tab    – a checklist a person completes by hand. It holds
 *                     • standard checks no scanner can do,
 *                     • one item for every automated "needs review" or failure,
 *                     • component-specific checks.
 *                   Each item has a status (To do / Resolved / Accepted) and a comment, saved to
 *                   src/a11y/manual/<slug>.json while the dev server runs.
 *                   Accepted = a known issue the team has decided to live with; it needs a reason
 *                   and moves a scanner finding into its own "Accepted" group.
 *                   Resolved and Accepted go stale after MANUAL_STALE_AFTER_DAYS (90) and count as
 *                   "to do" again until someone confirms them.
 *
 * Props:
 *   scan             parsed src/a11y/<route-slug>.json (written by `npm run a11y:scan`)
 *   componentChecks  [{ id, category?, title, how, why, wcag, note? }]  component-specific items
 *   standardNotes    { [standardCheckId]: string }  hint shown on a standard item
 *   omit             standard check ids that do not apply to this component
 *
 * See docs/accessibility-status-prompt.md for the data shapes.
 */
const STALE_AFTER_DAYS = 30; // automated scan age
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MAX_COMMENT = 2000;

function scanAgeDays(scanDate) {
  if (!scanDate) return null;
  const time = new Date(scanDate).getTime();
  return Number.isNaN(time) ? null : Math.max(0, Math.floor((Date.now() - time) / MS_PER_DAY));
}

const formatAge = (days) => (days === 0 ? 'today' : days === 1 ? '1 day ago' : `${days} days ago`);
const sumCount = (list) => list.reduce((total, item) => total + (item.count ?? 1), 0);

const STATUS = {
  pass: { Icon: CheckmarkFilled, label: 'All checks complete' },
  review: { Icon: WarningAltFilled, label: 'Checks outstanding' },
  fail: { Icon: ErrorFilled, label: 'Failures found' },
};

export function AccessibilityPanel({ scan, componentChecks = [], standardNotes = {}, omit = [] }) {
  const [open, setOpen] = useState(false);
  const slug = slugForScan(scan);
  const manual = useManualState(slug);

  const checklist = useMemo(
    () => buildChecklist({ scan, componentChecks, standardNotes, omit }),
    [scan, componentChecks, standardNotes, omit],
  );

  const axe = scan.axe ?? {};
  const ibm = scan.ibm ?? {};
  const ibmIssues = ibm.issues ?? [];

  // Scanner findings the team has accepted (and not gone stale) leave the failed / review groups.
  const statusOf = (id) => itemStatus(manual.items[id]);
  const isAccepted = (id) => {
    const status = statusOf(id);
    return status.state === 'accepted' && !status.stale;
  };
  const axeKey = (rule) => toolItemId('axe', rule.id);
  const ibmKey = (issue) => toolItemId('ibm', issue.ruleId ?? issue.issue);

  const axeFailed = (axe.violations ?? []).filter((r) => !isAccepted(axeKey(r)));
  const axeReview = (axe.incomplete ?? []).filter((r) => !isAccepted(axeKey(r)));
  const ibmFailed = ibmIssues.filter((i) => i.type === 'Violation' && !isAccepted(ibmKey(i)));
  const ibmReview = ibmIssues.filter((i) => i.type !== 'Violation' && !isAccepted(ibmKey(i)));

  const accepted = [
    ...(axe.violations ?? []).filter((r) => isAccepted(axeKey(r))).map((rule) => ({ tool: 'axe', fail: true, rule, id: axeKey(rule) })),
    ...(axe.incomplete ?? []).filter((r) => isAccepted(axeKey(r))).map((rule) => ({ tool: 'axe', fail: false, rule, id: axeKey(rule) })),
    ...ibmIssues.filter((i) => isAccepted(ibmKey(i))).map((issue) => ({ tool: 'ibm', fail: issue.type === 'Violation', issue, id: ibmKey(issue) })),
  ];

  const automatedFailures = axeFailed.length + sumCount(ibmFailed);
  const automatedReview = axeReview.length + sumCount(ibmReview);

  const statuses = checklist.map((item) => itemStatus(manual.items[item.id]));
  const resolvedCount = statuses.filter((status) => status.closed).length;
  const staleCount = statuses.filter((status) => status.stale).length;
  const outstanding = checklist.length - resolvedCount;
  const knownIds = new Set(checklist.map((item) => item.id));
  const orphaned = Object.keys(manual.items).filter((id) => !knownIds.has(id)).length;

  const overall = automatedFailures > 0 ? 'fail' : outstanding > 0 ? 'review' : 'pass';
  const { Icon, label: overallLabel } = STATUS[overall];

  const ageDays = scanAgeDays(scan.scanDate);
  const isStale = ageDays !== null && ageDays > STALE_AFTER_DAYS;

  return (
    <section className="a11y-panel" aria-labelledby={`${slug}-a11y-title`}>
      <h2 className="a11y-panel__heading">
        <button
          type="button"
          className="a11y-panel__header"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={`${slug}-a11y-body`}
        >
          <Icon size={20} className={`a11y-panel__icon--${overall}`} aria-hidden="true" />
          <span id={`${slug}-a11y-title`} className="a11y-panel__title">
            Accessibility status — {overallLabel}
          </span>
          <span className="a11y-panel__meta">
            <span>{automatedFailures} automated failure{automatedFailures === 1 ? '' : 's'}</span>
            <span>{resolvedCount} of {checklist.length} manual checks done</span>
            {accepted.length > 0 && <span>{accepted.length} accepted</span>}
            {staleCount > 0 && <span className="a11y-panel__stale">{staleCount} need re-testing</span>}
            {ageDays === null ? (
              <span className="a11y-panel__stale">Not scanned</span>
            ) : (
              <span className={isStale ? 'a11y-panel__stale' : undefined}>
                {isStale && 'Out of date — '}Scanned {new Date(scan.scanDate).toLocaleDateString()} ({formatAge(ageDays)})
              </span>
            )}
          </span>
        </button>
      </h2>

      {open && (
        <div className="a11y-panel__body" id={`${slug}-a11y-body`}>
          <Tabs>
            <TabList aria-label="Accessibility status sections" contained>
              <Tab>Automated tests</Tab>
              <Tab>Manual checklist ({outstanding} to do)</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AutomatedTab
                  axe={axe}
                  ibm={ibm}
                  axeFailed={axeFailed}
                  axeReview={axeReview}
                  ibmFailed={ibmFailed}
                  ibmReview={ibmReview}
                  automatedFailures={automatedFailures}
                  automatedReview={automatedReview}
                  accepted={accepted}
                  manualItems={manual.items}
                />
              </TabPanel>
              <TabPanel>
                <ManualTab
                  slug={slug}
                  checklist={checklist}
                  manual={manual}
                  resolvedCount={resolvedCount}
                  staleCount={staleCount}
                  orphaned={orphaned}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      )}
    </section>
  );
}

// ─── Automated tab ───────────────────────────────────────────────────────────

function AutomatedTab({ axe, ibm, axeFailed, axeReview, ibmFailed, ibmReview, automatedFailures, automatedReview, accepted, manualItems }) {
  const axePassed = axe.passed ?? [];
  const ibmPassed = ibm.passed ?? [];

  return (
    <>
      <p className="a11y-panel__intro">
        Results from two scanners run against this component only (not the sandbox page around it).
        Automated tools find roughly a third of accessibility problems, so every
        “needs review” result and everything in the Manual checklist tab still needs a person.
      </p>

      <div className="a11y-panel__cards">
        <ToolCard
          name="axe-core"
          version={axe.version}
          failed={axeFailed.length}
          review={axeReview.length}
          passed={axePassed.length}
          scanDate={axe.scanDate}
        />
        <ToolCard
          name="IBM Equal Access"
          version={ibm.version}
          failed={sumCount(ibmFailed)}
          review={sumCount(ibmReview)}
          passed={ibmPassed.length}
          scanDate={ibm.scanDate}
        />
      </div>

      <h3 className="a11y-panel__section-title">
        <ErrorFilled size={16} className="a11y-panel__icon--fail" aria-hidden="true" /> Failed ({automatedFailures})
      </h3>
      {automatedFailures === 0 ? (
        <p className="a11y-panel__muted">No automated failures.</p>
      ) : (
        <>
          {axeFailed.map((rule) => <AxeRow key={rule.id} rule={rule} kind="fail" />)}
          {ibmFailed.map((issue, i) => <IbmRow key={`${issue.ruleId}-${i}`} issue={issue} />)}
        </>
      )}

      <h3 className="a11y-panel__section-title">
        <WarningAltFilled size={16} className="a11y-panel__icon--review" aria-hidden="true" /> Needs human review ({automatedReview})
      </h3>
      <p className="a11y-panel__section-note">
        The tool could not decide. Each one has a matching item in the Manual checklist tab.
      </p>
      {automatedReview === 0 ? (
        <p className="a11y-panel__muted">Nothing needs review.</p>
      ) : (
        <>
          {axeReview.map((rule) => <AxeRow key={rule.id} rule={rule} kind="review" />)}
          {ibmReview.map((issue, i) => <IbmRow key={`${issue.ruleId}-${i}`} issue={issue} />)}
        </>
      )}

      {accepted.length > 0 && (
        <>
          <h3 className="a11y-panel__section-title">
            <Information size={16} aria-hidden="true" /> Accepted known issues ({accepted.length})
          </h3>
          <p className="a11y-panel__section-note">
            Findings the team has decided to live with, each with a reason from the Manual checklist tab.
            They return to the lists above after {MANUAL_STALE_AFTER_DAYS} days unless re-confirmed.
          </p>
          {accepted.map((entry, i) => (
            <div key={`${entry.id}-${i}`}>
              {entry.tool === 'axe'
                ? <AxeRow rule={entry.rule} kind={entry.fail ? 'fail' : 'review'} accepted={manualItems[entry.id]} />
                : <IbmRow issue={entry.issue} accepted={manualItems[entry.id]} />}
            </div>
          ))}
        </>
      )}

      <h3 className="a11y-panel__section-title">
        <CheckmarkFilled size={16} className="a11y-panel__icon--pass" aria-hidden="true" /> Passed ({axePassed.length + ibmPassed.length} rules)
      </h3>
      <Accordion>
        <AccordionItem title={`axe-core passed rules (${axePassed.length})`}>
          <p className="a11y-panel__section-note">
            A rule is listed when it found no problem on at least some elements. It may also appear above if it failed or needed review on other elements.
          </p>
          {axePassed.map((rule) => (
            <PassRow key={rule.id} id={rule.id} description={rule.description} count={rule.nodeCount} helpUrl={rule.helpUrl} />
          ))}
        </AccordionItem>
        <AccordionItem title={`IBM Equal Access passed rules (${ibmPassed.length})`}>
          {ibmPassed.map((rule) => (
            <PassRow key={rule.id} id={rule.id} description={rule.description} count={rule.count} checkpoint={rule.checkpoint} helpUrl={rule.helpUrl} />
          ))}
        </AccordionItem>
      </Accordion>
    </>
  );
}

function ToolCard({ name, version, failed, review, passed, scanDate }) {
  const state = failed > 0 ? 'fail' : review > 0 ? 'review' : 'pass';
  return (
    <div className={`a11y-panel__card a11y-panel__card--${state}`}>
      <h3 className="a11y-panel__card-title">{name}</h3>
      <div className="a11y-panel__card-sub">
        {version ? `Version ${version}` : ''}{scanDate ? ` · ${new Date(scanDate).toLocaleDateString()}` : ''}
      </div>
      <ul className="a11y-panel__stat-list">
        <li className="a11y-panel__stat">
          <ErrorFilled size={16} className="a11y-panel__icon--fail" aria-hidden="true" />
          {failed} failed
        </li>
        <li className="a11y-panel__stat">
          <WarningAltFilled size={16} className="a11y-panel__icon--review" aria-hidden="true" />
          {review} need{review === 1 ? 's' : ''} review
        </li>
        <li className="a11y-panel__stat">
          <CheckmarkFilled size={16} className="a11y-panel__icon--pass" aria-hidden="true" />
          {passed} rules passed
        </li>
      </ul>
    </div>
  );
}

function AxeRow({ rule, kind, accepted }) {
  return (
    <div className="a11y-panel__row">
      <div className="a11y-panel__row-head">
        <RowTag kind={kind} accepted={accepted} />
        <span className="a11y-panel__code">{rule.id}</span>
        {rule.impact && <span className="a11y-panel__muted">Impact: {rule.impact}</span>}
      </div>
      <div>{rule.description}</div>
      {(rule.nodes ?? []).slice(0, 3).map((node, i) => (
        <code key={i} className="a11y-panel__snippet">{node.html}</code>
      ))}
      {rule.helpUrl && <GuidanceLink href={rule.helpUrl} />}
      <AcceptedReason accepted={accepted} />
    </div>
  );
}

function RowTag({ kind, accepted }) {
  if (accepted) return <Tag type="cool-gray" size="sm">{kind === 'fail' ? 'Accepted failure' : 'Accepted'}</Tag>;
  return <Tag type={kind === 'fail' ? 'red' : 'warm-gray'} size="sm">{kind === 'fail' ? 'Failed' : 'Needs review'}</Tag>;
}

function AcceptedReason({ accepted }) {
  if (!accepted) return null;
  return (
    <p className="a11y-panel__muted">
      Reason: {accepted.comment}
      {accepted.updatedAt ? ` (accepted ${new Date(accepted.updatedAt).toLocaleDateString()})` : ''}
    </p>
  );
}

function IbmRow({ issue, accepted }) {
  const failed = issue.type === 'Violation';
  return (
    <div className="a11y-panel__row">
      <div className="a11y-panel__row-head">
        <RowTag kind={failed ? 'fail' : 'review'} accepted={accepted} />
        <span className="a11y-panel__code">{issue.ruleId}</span>
        <span className="a11y-panel__muted">IBM · {issue.checkpoint}</span>
        {issue.count > 1 && <span className="a11y-panel__muted">{issue.count} occurrences</span>}
      </div>
      <div>{issue.issue}</div>
      {issue.element && <code className="a11y-panel__snippet">{issue.element}</code>}
      {issue.helpUrl && <GuidanceLink href={issue.helpUrl} />}
      <AcceptedReason accepted={accepted} />
    </div>
  );
}

function PassRow({ id, description, count, checkpoint, helpUrl }) {
  return (
    <div className="a11y-panel__row">
      <div className="a11y-panel__row-head">
        <Tag type="green" size="sm">Passed</Tag>
        <span className="a11y-panel__code">{id}</span>
        {count > 0 && <span className="a11y-panel__muted">{count} element{count === 1 ? '' : 's'}</span>}
        {checkpoint && <span className="a11y-panel__muted">{checkpoint}</span>}
      </div>
      <div>{description}</div>
      {helpUrl && <GuidanceLink href={helpUrl} />}
    </div>
  );
}

function GuidanceLink({ href }) {
  return (
    <div>
      <Link href={href} target="_blank" rel="noopener noreferrer" size="sm">
        View guidance (opens in a new tab)
      </Link>
    </div>
  );
}

// ─── Manual tab ──────────────────────────────────────────────────────────────

const FILTERS = ['all', 'todo', 'resolved', 'accepted'];

function ManualTab({ slug, checklist, manual, resolvedCount, staleCount, orphaned }) {
  const [filter, setFilter] = useState('all');
  const total = checklist.length;

  const visible = checklist.filter((item) => {
    const { state, closed } = itemStatus(manual.items[item.id]);
    if (filter === 'all') return true;
    if (filter === 'todo') return !closed;
    return closed && state === filter;
  });

  const categories = CATEGORIES.filter((c) => visible.some((item) => item.category === c));

  return (
    <>
      <p className="a11y-panel__intro">
        Work through these by hand, with no tools required beyond a keyboard, a browser and (where stated) a screen reader.
        Set the status to <strong>Resolved</strong> when you have tested the item and either it passed or you have
        recorded the outcome in the comment. Choose <strong>Accepted</strong> for a known issue the team has decided to live
        with; it needs a reason, and a scanner finding then moves to the Accepted group on the Automated tab.
        Both expire after {MANUAL_STALE_AFTER_DAYS} days and need confirming again. {manual.canSave
          ? 'Comments and ticks are saved to src/a11y/manual/ — commit that file to keep them.'
          : 'This is a read-only copy of the saved checklist; run the dev server to edit it.'}
      </p>

      {manual.error && (
        <InlineNotification kind="error" title="Checklist" subtitle={manual.error} hideCloseButton lowContrast />
      )}
      {staleCount > 0 && (
        <InlineNotification
          kind="warning"
          title="Re-test needed"
          subtitle={`${staleCount} item${staleCount === 1 ? ' was' : 's were'} last updated more than ${MANUAL_STALE_AFTER_DAYS} days ago and count as to do until confirmed.`}
          hideCloseButton
          lowContrast
        />
      )}
      {orphaned > 0 && (
        <InlineNotification
          kind="info"
          title="Saved notes"
          subtitle={`${orphaned} saved note${orphaned === 1 ? '' : 's'} belong to checks that no longer appear (the scan results changed). They are kept in the file.`}
          hideCloseButton
          lowContrast
        />
      )}

      <div className="a11y-panel__progress">
        <label htmlFor={`${slug}-progress`} className="a11y-panel__progress-label">
          Manual checks done (resolved or accepted): {resolvedCount} of {total} ({total - resolvedCount} to do)
        </label>
        <progress id={`${slug}-progress`} className="a11y-panel__progress-bar" value={resolvedCount} max={total || 1} />
      </div>

      <div className="a11y-panel__toolbar">
        <ContentSwitcher
          size="sm"
          selectedIndex={FILTERS.indexOf(filter)}
          onChange={({ index }) => setFilter(FILTERS[index])}
        >
          <Switch name="all" text="All" />
          <Switch name="todo" text="To do" />
          <Switch name="resolved" text="Resolved" />
          <Switch name="accepted" text="Accepted" />
        </ContentSwitcher>
      </div>

      {visible.length === 0 && <p className="a11y-panel__empty">No checks in this view.</p>}

      {categories.map((category) => (
        <div key={category}>
          <h3 className="a11y-panel__section-title">{category}</h3>
          {visible
            .filter((item) => item.category === category)
            .map((item) => (
              <ChecklistItem
                key={item.id}
                slug={slug}
                item={item}
                saved={manual.items[item.id]}
                canSave={manual.canSave}
                onSave={manual.save}
              />
            ))}
        </div>
      ))}
    </>
  );
}

const SOURCE_LABEL = {
  standard: 'Every component',
  tool: 'Raised by a scanner',
  component: 'This component',
};

function ChecklistItem({ slug, item, saved, canSave, onSave }) {
  const savedComment = saved?.comment ?? '';
  const status = itemStatus(saved);
  const resolved = Boolean(saved?.resolved);
  const accepted = Boolean(saved?.accepted);
  const value = accepted ? 'accepted' : resolved ? 'resolved' : 'todo';
  const [draft, setDraft] = useState(savedComment);
  const [message, setMessage] = useState('');
  const fieldId = `${slug}-${item.id}`.replace(/[^a-z0-9-]/gi, '-');

  // Keep the box in step with what was loaded from disk.
  useEffect(() => { setDraft(savedComment); }, [savedComment]);

  const persist = async (next) => {
    setMessage('Saving…');
    const ok = await onSave(item.id, next);
    setMessage(ok ? `Saved ${new Date().toLocaleTimeString()}` : '');
  };

  return (
    <div className={`a11y-panel__item${status.closed ? ' a11y-panel__item--resolved' : ''}${status.stale ? ' a11y-panel__item--stale' : ''}`}>
      <h4 className="a11y-panel__item-title">{item.title}</h4>
      <div className="a11y-panel__item-meta">
        <Tag type={item.source === 'tool' ? 'warm-gray' : item.source === 'component' ? 'purple' : 'gray'} size="sm">
          {SOURCE_LABEL[item.source]}
        </Tag>
        <span>{item.wcag}</span>
        {saved?.updatedAt && <span>Updated {new Date(saved.updatedAt).toLocaleDateString()}</span>}
        {status.stale && (
          <Tag type="red" size="sm">Re-test needed ({status.ageDays} days old)</Tag>
        )}
      </div>

      <dl className="a11y-panel__details">
        <dt>How to test</dt>
        <dd>{item.how}</dd>
        <dt>Why a person is needed</dt>
        <dd>{item.why}</dd>
        {item.note && (
          <>
            <dt>Earlier pre-check (headless Chrome, not a substitute for your own test)</dt>
            <dd>{item.note}</dd>
          </>
        )}
        {item.evidence?.length > 0 && (
          <>
            <dt>Found at</dt>
            <dd>{item.evidence.map((html, i) => <code key={i} className="a11y-panel__snippet">{html}</code>)}</dd>
          </>
        )}
      </dl>

      {item.helpUrl && <GuidanceLink href={item.helpUrl} />}

      <RadioButtonGroup
        legendText="Status"
        name={`${fieldId}-status`}
        orientation="horizontal"
        valueSelected={value}
        disabled={!canSave}
        onChange={(next) => persist({ resolved: next === 'resolved', accepted: next === 'accepted', comment: draft })}
      >
        <RadioButton id={`${fieldId}-todo`} labelText="To do" value="todo" />
        <RadioButton id={`${fieldId}-resolved`} labelText="Resolved" value="resolved" />
        <RadioButton
          id={`${fieldId}-accepted`}
          labelText="Accepted (known issue)"
          value="accepted"
          disabled={!canSave || draft.trim() === ''}
        />
      </RadioButtonGroup>
      {status.stale && canSave && (
        <Button size="sm" kind="tertiary" onClick={() => persist({ resolved, accepted, comment: draft })}>
          Confirm this is still {accepted ? 'accepted' : 'resolved'}
        </Button>
      )}
      <TextArea
        id={`${fieldId}-comment`}
        labelText="Comment"
        helperText={'What you tested, what you found, and any decision. Required to choose Accepted (the reason).'}
        invalid={accepted && draft.trim() === ''}
        invalidText="An accepted item needs a reason."
        rows={2}
        value={draft}
        maxCount={MAX_COMMENT}
        enableCounter
        disabled={!canSave}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => {
          if (draft === savedComment || (accepted && draft.trim() === '')) return;
          persist({ resolved, accepted, comment: draft });
        }}
      />
      <div className="a11y-panel__saved" role="status" aria-live="polite">{message}</div>
    </div>
  );
}
