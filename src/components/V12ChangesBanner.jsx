import React from 'react';
import { Tag } from '@carbon/react';
import {
  CheckmarkFilled,
  Warning,
  Information,
} from '@carbon/icons-react';

/**
 * V12ChangesBanner
 *
 * Displays a "What changed in v12" section on each component page.
 * Sources changes from Carbon changelog, Sass diffs, and JS source inspection.
 *
 * Props:
 *   jsChanges     {Array}   – Real JS/DOM/behaviour changes confirmed from source.
 *                             Each item: { description, impact }
 *                             impact: 'behaviour' | 'structure' | 'none'
 *   cssChanges    {Array}   – Visual/CSS changes (Sass compile-time, applied globally).
 *                             Each item: string
 *   noJsChanges   {boolean} – Set true if the FeatureFlags wrapper has no JS effect.
 *   notes         {string}  – Optional free-text caveat or sandbox-specific note.
 */
export function V12ChangesBanner({ jsChanges = [], cssChanges = [], noJsChanges = false, notes }) {
  const hasJs = jsChanges.length > 0 && !noJsChanges;

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      background: '#f4f4f4',
      padding: '1rem 1.25rem',
      marginBottom: '1.5rem',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem',
        fontWeight: 600,
        fontSize: '0.875rem',
      }}>
        <Information size={16} />
        What changed in v12
      </div>

      {/* JS / behaviour changes */}
      <div style={{ marginBottom: cssChanges.length ? '0.875rem' : 0 }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#525252',
          marginBottom: '0.375rem',
        }}>
          Behaviour &amp; structure
        </div>

        {noJsChanges || jsChanges.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem' }}>
            <CheckmarkFilled size={16} style={{ color: '#24a148', flexShrink: 0, marginTop: '1px' }} />
            <span>
              No changes — the <code>FeatureFlags</code> wrapper has no effect on
              this component's JS behaviour or DOM structure.
            </span>
          </div>
        ) : (
          <ul style={{ margin: 0, paddingInlineStart: '1.25rem', fontSize: '0.8125rem' }}>
            {jsChanges.map((c, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>
                <Tag
                  type={c.impact === 'behaviour' ? 'blue' : c.impact === 'structure' ? 'purple' : 'gray'}
                  size="sm"
                  style={{ marginInlineEnd: '0.375rem' }}
                >
                  {c.impact}
                </Tag>
                {c.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CSS / visual changes */}
      {cssChanges.length > 0 && (
        <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '0.75rem' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#525252',
            marginBottom: '0.375rem',
          }}>
            Visual / CSS <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(applied globally via Sass flag)</span>
          </div>
          <ul style={{ margin: 0, paddingInlineStart: '1.25rem', fontSize: '0.8125rem' }}>
            {cssChanges.map((c, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{c}</li>)}
          </ul>
        </div>
      )}

      {/* Sandbox-specific note */}
      {notes && (
        <div style={{
          borderTop: '1px solid #e0e0e0',
          paddingTop: '0.75rem',
          marginTop: '0.75rem',
          fontSize: '0.8125rem',
          color: '#525252',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'flex-start',
        }}>
          <Warning size={16} style={{ flexShrink: 0, marginTop: '1px', color: '#b28600' }} />
          <span><strong>Sandbox note:</strong> {notes}</span>
        </div>
      )}
    </div>
  );
}
