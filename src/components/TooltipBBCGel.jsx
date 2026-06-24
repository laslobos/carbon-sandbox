import React from 'react';
import { Download } from '@carbon/icons-react';
import './TooltipBBCGel.scss';

function TooltipBBCGel() {
  return (
    <div className="bbc-gel-tooltip-examples">
      <div className="example-section">
        <h3>Example 1: Tooltip Inside Link (Inline)</h3>
        <p>The tooltip is a child of the interactive element and appears on hover/focus.</p>
        <a href="#download" className="download-link" download>
          <Download size={24} aria-hidden="true" />
          <span className="tooltip">Download</span>
        </a>
      </div>

      <div className="example-section">
        <h3>Example 2: Tooltip Outside Link (aria-labelledby)</h3>
        <p>The tooltip is outside the interactive element and associated via aria-labelledby.</p>
        <div className="download-container">
          <a 
            href="#download" 
            className="download-link-external" 
            download 
            aria-labelledby="download-tooltip"
          >
            <Download size={24} aria-hidden="true" />
          </a>
          <span className="tooltip-external" id="download-tooltip">Download</span>
        </div>
      </div>

      <div className="example-section">
        <h3>Example 3: Multiple Icon Buttons with Tooltips</h3>
        <p>Demonstrating tooltips as primary labels for icon-only buttons.</p>
        <div className="icon-button-group">
          <button className="icon-button" aria-labelledby="edit-tooltip">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            <span className="tooltip-external" id="edit-tooltip">Edit</span>
          </button>

          <button className="icon-button" aria-labelledby="delete-tooltip">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
            <span className="tooltip-external" id="delete-tooltip">Delete</span>
          </button>

          <button className="icon-button" aria-labelledby="share-tooltip">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
            <span className="tooltip-external" id="share-tooltip">Share</span>
          </button>
        </div>
      </div>

      <div className="example-section">
        <h3>Example 4: Information Icon (Non-Interactive)</h3>
        <p>For purely informational tooltips that don't navigate or perform actions.</p>
        <div className="info-icon-demo">
          <label htmlFor="username-input">
            Username
            <span
              className="info-icon"
              tabIndex="0"
              aria-describedby="username-info"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
              </svg>
              <span className="tooltip-external" id="username-info" role="tooltip">
                Username must be 3-20 characters, letters and numbers only
              </span>
            </span>
          </label>
          <input
            type="text"
            id="username-input"
            className="text-input"
            placeholder="Enter username"
          />
        </div>
        <p className="semantic-note">
          <strong>Semantic Note:</strong> Uses <code>{'<span>'}</code> with <code>tabindex="0"</code> because this is <strong>purely informational</strong> - it doesn't navigate or perform an action. Uses <code>aria-describedby</code> to associate the tooltip, and the tooltip has <code>role="tooltip"</code> for proper semantics.
        </p>
        <p className="semantic-note">
          <strong>Accessibility Improvements:</strong>
        </p>
        <ul className="accessibility-improvements">
          <li>✅ <code>tabindex="0"</code> makes it keyboard focusable</li>
          <li>✅ <code>aria-describedby</code> properly associates tooltip with icon</li>
          <li>✅ <code>role="tooltip"</code> on tooltip for correct semantics</li>
          <li>✅ SVG has <code>aria-hidden="true"</code> since it's decorative</li>
          <li>⚠️ Note: In production, tooltip should be dynamically hidden with <code>aria-hidden="true"</code> when not visible</li>
        </ul>
      </div>

      <div className="accessibility-notes">
        <h3>BBC GEL Accessibility Implementation Notes:</h3>
        <ul>
          <li>✅ Tooltips appear on both <code>:hover</code> and <code>:focus</code> events</li>
          <li>✅ Uses visible <code>{'<span>'}</code> elements instead of <code>title</code> attribute</li>
          <li>✅ Icons have <code>aria-hidden="true"</code> since tooltip provides the label</li>
          <li>✅ Uses <code>aria-labelledby</code> to associate tooltip with interactive element</li>
          <li>✅ Keyboard accessible - tooltip appears when element receives focus</li>
          <li>❌ Avoids <code>title</code> attribute (not keyboard accessible, unreliable in screen readers)</li>
        </ul>
        
        <h4>Accessibility Comparison of Examples:</h4>
        <table className="semantic-table">
          <thead>
            <tr>
              <th>Example</th>
              <th>Element</th>
              <th>✅ Pros</th>
              <th>⚠️ Cons / Considerations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Example 1 & 2</strong><br/>Download Link</td>
              <td><code>{'<a download>'}</code></td>
              <td>
                • Semantic link element<br/>
                • Native keyboard support<br/>
                • Screen readers announce as "link"<br/>
                • Works without JavaScript<br/>
                • Tooltip on hover/focus
              </td>
              <td>
                • Tooltip inline (Ex 1) vs external (Ex 2)<br/>
                • External requires <code>aria-labelledby</code><br/>
                • Must have valid <code>href</code> attribute
              </td>
            </tr>
            <tr>
              <td><strong>Example 3</strong><br/>Action Buttons</td>
              <td><code>{'<button>'}</code></td>
              <td>
                • Semantic button element<br/>
                • Native keyboard support (Space/Enter)<br/>
                • Screen readers announce as "button"<br/>
                • Clear interactive affordance<br/>
                • Tooltip via <code>aria-labelledby</code>
              </td>
              <td>
                • Requires JavaScript for functionality<br/>
                • Must handle click events<br/>
                • Should have visible focus indicator<br/>
                • Icon-only buttons need accessible labels
              </td>
            </tr>
            <tr>
              <td><strong>Example 4</strong><br/>Info Icon</td>
              <td><code>{'<span tabindex="0">'}</code></td>
              <td>
                • Non-interactive (no action/navigation)<br/>
                • <code>tabindex="0"</code> for keyboard access<br/>
                • <code>aria-describedby</code> associates tooltip<br/>
                • <code>role="tooltip"</code> for semantics<br/>
                • Purely informational
              </td>
              <td>
                • Not naturally focusable (needs <code>tabindex</code>)<br/>
                • No native keyboard interaction<br/>
                • Tooltip should be dynamically <code>aria-hidden</code><br/>
                • Less discoverable than button/link<br/>
                • Consider <code>{'<button type="button">'}</code> alternative
              </td>
            </tr>
          </tbody>
        </table>
        
        <h4>Information Icon Tooltip Implementation Options:</h4>
        <p>Comparing different approaches for implementing tooltips on information icons. Try each example below:</p>
        
        <div className="implementation-examples">
          <div className="implementation-example">
            <h5>Option 1: Span with tabindex + role=button</h5>
            <div className="example-demo">
              <label htmlFor="input-1">
                Field Label
                <span
                  className="info-icon-option"
                  tabIndex="0"
                  role="button"
                  aria-label="More information"
                  aria-describedby="tooltip-option-1"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
                  </svg>
                  <span className="tooltip-option" id="tooltip-option-1" role="tooltip" aria-hidden="true">
                    This field requires your full legal name
                  </span>
                </span>
              </label>
              <input type="text" id="input-1" className="text-input" placeholder="Enter value" />
            </div>
          </div>

          <div className="implementation-example">
            <h5>Option 2: Link with href="#"</h5>
            <div className="example-demo">
              <label htmlFor="input-2">
                Field Label
                <a
                  href="#"
                  className="info-icon-option"
                  aria-label="More information"
                  aria-describedby="tooltip-option-2"
                  onClick={(e) => e.preventDefault()}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
                  </svg>
                  <span className="tooltip-option" id="tooltip-option-2" role="tooltip" aria-hidden="true">
                    This field requires your full legal name
                  </span>
                </a>
              </label>
              <input type="text" id="input-2" className="text-input" placeholder="Enter value" />
            </div>
          </div>

          <div className="implementation-example">
            <h5>Option 3: Button element (Recommended)</h5>
            <div className="example-demo">
              <label htmlFor="input-3">
                Field Label
                <button
                  type="button"
                  className="info-icon-option"
                  aria-label="More information"
                  aria-describedby="tooltip-option-3"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
                  </svg>
                  <span className="tooltip-option" id="tooltip-option-3" role="tooltip" aria-hidden="true">
                    This field requires your full legal name
                  </span>
                </button>
              </label>
              <input type="text" id="input-3" className="text-input" placeholder="Enter value" />
            </div>
          </div>

          <div className="implementation-example">
            <h5>Option 4: Span with tabindex only</h5>
            <div className="example-demo">
              <label htmlFor="input-4">
                Field Label
                <span
                  className="info-icon-option"
                  tabIndex="0"
                  aria-label="More information"
                  aria-describedby="tooltip-option-4"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
                  </svg>
                  <span className="tooltip-option" id="tooltip-option-4" role="tooltip" aria-hidden="true">
                    This field requires your full legal name
                  </span>
                </span>
              </label>
              <input type="text" id="input-4" className="text-input" placeholder="Enter value" />
            </div>
          </div>

          <div className="implementation-example">
            <h5>Option 5: Button with aria-label only</h5>
            <div className="example-demo">
              <label htmlFor="input-5">
                Field Label
                <button
                  type="button"
                  className="info-icon-option"
                  aria-label="This field requires your full legal name"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
                  </svg>
                </button>
              </label>
              <input type="text" id="input-5" className="text-input" placeholder="Enter value" />
            </div>
          </div>
        </div>

        <div className="aria-explanation">
          <h5>🔍 Critical Accessibility Decision: aria-label vs aria-describedby</h5>
          
          <div className="comparison-boxes">
            <div className="approach-box">
              <h6>Options 1-4: aria-label + aria-describedby</h6>
              <p><strong>Screen reader announces:</strong> "More information, button, This field requires your full legal name"</p>
              <p><strong>✅ Pros:</strong></p>
              <ul>
                <li>Tooltip visible to sighted users on hover/focus</li>
                <li>Benefits users with cognitive disabilities</li>
                <li>Provides context for all users</li>
                <li>Follows WCAG 2.1 success criterion 1.4.13 (Content on Hover or Focus)</li>
              </ul>
              <p><strong>❌ Cons:</strong></p>
              <ul>
                <li>More verbose for screen reader users</li>
                <li>Generic "More information" may not be helpful</li>
              </ul>
            </div>

            <div className="approach-box">
              <h6>Option 5: aria-label only</h6>
              <p><strong>Screen reader announces:</strong> "This field requires your full legal name, button"</p>
              <p><strong>✅ Pros:</strong></p>
              <ul>
                <li>Concise for screen reader users</li>
                <li>Direct and clear announcement</li>
                <li>No redundancy</li>
              </ul>
              <p><strong>❌ Cons:</strong></p>
              <ul>
                <li><strong>No visible tooltip for sighted users!</strong></li>
                <li>Fails WCAG 2.1 SC 1.4.13 (no visible content on hover/focus)</li>
                <li>Excludes users with cognitive disabilities who benefit from visual tooltips</li>
                <li>Sighted keyboard users get no feedback</li>
              </ul>
            </div>
          </div>

          <div className="recommendation-box">
            <h6>💡 Recommendation: Use aria-describedby with Visible Tooltips</h6>
            <p><strong>Best practice for information icons:</strong></p>
            <ul>
              <li>✅ Use <code>aria-label="Help"</code> or <code>aria-label="More information"</code> as the name</li>
              <li>✅ Use <code>aria-describedby</code> to reference the visible tooltip</li>
              <li>✅ Show tooltip visually on hover AND focus</li>
              <li>✅ Add <code>aria-hidden="true"</code> to tooltip span to prevent double reading</li>
            </ul>
            <p><strong>Why this is better than aria-label alone:</strong></p>
            <ul>
              <li>🎯 Serves ALL users, not just screen reader users</li>
              <li>🎯 Complies with WCAG 2.1 Level AA</li>
              <li>🎯 Provides visual confirmation for sighted keyboard users</li>
              <li>🎯 Helps users with cognitive disabilities, low vision, or who need visual reinforcement</li>
            </ul>
            <p className="final-verdict">
              <strong>Verdict:</strong> Option 5 (aria-label only) is NOT recommended despite being more concise.
              Options 1-4 with visible tooltips are more accessible overall because they serve a broader range of users and disabilities.
            </p>
          </div>
        </div>

        <p className="comparison-note"><strong>Compare the options above, then review the detailed analysis below:</strong></p>
        <table className="implementation-options-table">
          <thead>
            <tr>
              <th>Approach</th>
              <th>Implementation</th>
              <th>✅ Accessibility Pros</th>
              <th>❌ Accessibility Cons</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Span with tabindex + role=button</strong></td>
              <td>
                <code>{'<span tabindex="0" role="button" aria-describedby="tooltip-id">'}</code>
              </td>
              <td>
                • Keyboard focusable<br/>
                • Screen reader announces as "button"<br/>
                • Can use aria-describedby<br/>
                • Lightweight markup
              </td>
              <td>
                • No native Space/Enter activation<br/>
                • Requires JavaScript for keyboard events<br/>
                • Must manually handle button behavior<br/>
                • Misleading if not truly interactive<br/>
                • No native button styling/states
              </td>
              <td>
                ⚠️ <strong>Not Recommended</strong><br/>
                Use real button instead
              </td>
            </tr>
            <tr>
              <td><strong>2. Link with href="#"</strong></td>
              <td>
                <code>{'<a href="#" aria-describedby="tooltip-id">'}</code>
              </td>
              <td>
                • Keyboard focusable by default<br/>
                • Screen reader announces as "link"<br/>
                • Native focus management<br/>
                • Can use aria-describedby<br/>
                • Works without JavaScript for focus
              </td>
              <td>
                • Semantically incorrect (not navigation)<br/>
                • href="#" jumps to top of page<br/>
                • Requires preventDefault() in JavaScript<br/>
                • Misleading to users (expects navigation)<br/>
                • Screen reader users expect link behavior<br/>
                • Must handle click and Enter/Space separately
              </td>
              <td>
                ❌ <strong>Not Recommended</strong><br/>
                Wrong semantics for info icon
              </td>
            </tr>
            <tr>
              <td><strong>3. Button element</strong></td>
              <td>
                <code>{'<button type="button" aria-describedby="tooltip-id">'}</code>
              </td>
              <td>
                • Native keyboard support (Space/Enter)<br/>
                • Screen reader announces as "button"<br/>
                • Focusable by default<br/>
                • Native focus management<br/>
                • Clear interactive affordance<br/>
                • Accessible by default<br/>
                • Can be styled as needed
              </td>
              <td>
                • Implies interactivity (may confuse if purely informational)<br/>
                • Requires type="button" to prevent form submission<br/>
                • May need CSS to remove default button styling
              </td>
              <td>
                ✅ <strong>Recommended</strong><br/>
                Best for interactive tooltips
              </td>
            </tr>
            <tr>
              <td><strong>4. Span with tabindex only</strong></td>
              <td>
                <code>{'<span tabindex="0" aria-describedby="tooltip-id">'}</code>
              </td>
              <td>
                • Keyboard focusable<br/>
                • No implied interactivity<br/>
                • Purely informational semantics<br/>
                • Lightweight markup<br/>
                • Good for non-interactive help text
              </td>
              <td>
                • Not naturally focusable<br/>
                • No native keyboard interaction<br/>
                • Less discoverable<br/>
                • No semantic meaning<br/>
                • Screen reader may not announce role
              </td>
              <td>
                ⚠️ <strong>Use Sparingly</strong><br/>
                Only for truly non-interactive info
              </td>
            </tr>
            <tr>
              <td><strong>5. Button with aria-label (no visible text)</strong></td>
              <td>
                <code>{'<button type="button" aria-label="Info text">'}</code>
              </td>
              <td>
                • All benefits of button element<br/>
                • aria-label provides accessible name<br/>
                • Works without visible tooltip<br/>
                • Good for icon-only buttons
              </td>
              <td>
                • aria-label not visible to sighted users<br/>
                • Better to use aria-describedby with visible tooltip<br/>
                • Doesn't show tooltip on hover/focus<br/>
                • Less helpful for cognitive disabilities
              </td>
              <td>
                ⚠️ <strong>Limited Use</strong><br/>
                Prefer visible tooltips with aria-describedby
              </td>
            </tr>
          </tbody>
        </table>

        <div className="best-practice-note">
          <h4>💡 Best Practice Recommendation:</h4>
          <p>
            <strong>For information icons with tooltips, use Option 3:</strong>
          </p>
          <pre className="code-example">
{`<button type="button" aria-describedby="info-tooltip">
  <svg aria-hidden="true"><!-- info icon --></svg>
</button>
<span id="info-tooltip" role="tooltip">
  Your helpful information here
</span>`}
          </pre>
          <p><strong>Why this is best:</strong></p>
          <ul>
            <li>✅ Native keyboard support (Tab, Space, Enter)</li>
            <li>✅ Screen readers announce as "button" with associated description</li>
            <li>✅ Clear interactive affordance</li>
            <li>✅ Follows WCAG 2.1 guidelines</li>
            <li>✅ Tooltip visible to all users on hover/focus</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TooltipBBCGel;

// Made with Bob
