# axe-core Rules Reference

> Version: **4.13.0** (bundled with `@axe-core/cli` globally installed)  
> Run a scan: `axe <url>`  
> Filter by rule: `axe <url> -r rule-id,rule-id`  
> Filter by tag: `axe <url> -t wcag2aa`

---

## All Rules (109)

| Rule ID | Description |
|---|---|
| `accesskeys` | Ensure every accesskey attribute value is unique |
| `area-alt` | Ensure `<area>` elements of image maps have alternative text |
| `aria-allowed-attr` | Ensure an element's role supports its ARIA attributes |
| `aria-allowed-role` | Ensure role attribute has an appropriate value for the element |
| `aria-braille-equivalent` | Ensure aria-braillelabel and aria-brailleroledescription have a non-braille equivalent |
| `aria-command-name` | Ensure every ARIA button, link and menuitem has an accessible name |
| `aria-conditional-attr` | Ensure ARIA attributes are used as described in the specification of the element's role |
| `aria-deprecated-role` | Ensure elements do not use deprecated roles |
| `aria-dialog-name` | Ensure every ARIA dialog and alertdialog node has an accessible name |
| `aria-hidden-body` | Ensure `aria-hidden="true"` is not present on the document body |
| `aria-hidden-focus` | Ensure aria-hidden elements are not focusable nor contain focusable elements |
| `aria-input-field-name` | Ensure every ARIA input field has an accessible name |
| `aria-meter-name` | Ensure every ARIA meter node has an accessible name |
| `aria-progressbar-name` | Ensure every ARIA progressbar node has an accessible name |
| `aria-prohibited-attr` | Ensure ARIA attributes are not prohibited for an element's role |
| `aria-required-attr` | Ensure elements with ARIA roles have all required ARIA attributes |
| `aria-required-children` | Ensure elements with an ARIA role that require child roles contain them |
| `aria-required-parent` | Ensure elements with an ARIA role that require parent roles are contained by them |
| `aria-roledescription` | Ensure aria-roledescription is only used on elements with an implicit or explicit role |
| `aria-roles` | Ensure all elements with a role attribute use a valid value |
| `aria-tab-name` | Ensure every ARIA tab node has an accessible name |
| `aria-text` | Ensure `role="text"` is used on elements with no focusable descendants |
| `aria-toggle-field-name` | Ensure every ARIA toggle field has an accessible name |
| `aria-tooltip-name` | Ensure every ARIA tooltip node has an accessible name |
| `aria-treeitem-name` | Ensure every ARIA treeitem node has an accessible name |
| `aria-valid-attr-value` | Ensure all ARIA attributes have valid values |
| `aria-valid-attr` | Ensure attributes that begin with aria- are valid ARIA attributes |
| `audio-caption` | Ensure `<audio>` elements have captions |
| `autocomplete-valid` | Ensure the autocomplete attribute is correct and suitable for the form field |
| `avoid-inline-spacing` | Ensure that text spacing set through style attributes can be adjusted with custom stylesheets |
| `blink` | Ensure `<blink>` elements are not used |
| `button-name` | Ensure buttons have discernible text |
| `bypass` | Ensure each page has at least one mechanism for a user to bypass navigation and jump straight to the content |
| `color-contrast-enhanced` | Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds |
| `color-contrast` | Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds |
| `css-orientation-lock` | Ensure content is not locked to any specific display orientation, and the content is operable in all display orientations |
| `definition-list` | Ensure `<dl>` elements are structured correctly |
| `dlitem` | Ensure `<dt>` and `<dd>` elements are contained by a `<dl>` |
| `document-title` | Ensure each HTML document contains a non-empty `<title>` element |
| `duplicate-id-active` | Ensure every id attribute value of active elements is unique |
| `duplicate-id-aria` | Ensure every id attribute value used in ARIA and in labels is unique |
| `duplicate-id` | Ensure every id attribute value is unique |
| `empty-heading` | Ensure headings have discernible text |
| `empty-table-header` | Ensure table headers have discernible text |
| `focus-order-semantics` | Ensure elements in the focus order have a role appropriate for interactive content |
| `form-field-multiple-labels` | Ensure form field does not have multiple label elements |
| `frame-focusable-content` | Ensure `<frame>` and `<iframe>` elements with focusable content do not have `tabindex=-1` |
| `frame-tested` | Ensure `<iframe>` and `<frame>` elements contain the axe-core script |
| `frame-title-unique` | Ensure `<iframe>` and `<frame>` elements contain a unique title attribute |
| `frame-title` | Ensure `<iframe>` and `<frame>` elements have an accessible name |
| `heading-order` | Ensure the order of headings is semantically correct |
| `hidden-content` | Inform users about hidden content |
| `html-has-lang` | Ensure every HTML document has a lang attribute |
| `html-lang-valid` | Ensure the lang attribute of the `<html>` element has a valid value |
| `html-xml-lang-mismatch` | Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page |
| `identical-links-same-purpose` | Ensure that links with the same accessible name serve a similar purpose |
| `image-alt` | Ensure `<img>` elements have alternative text or a role of none or presentation |
| `image-redundant-alt` | Ensure image alternative is not repeated as text |
| `input-button-name` | Ensure input buttons have discernible text |
| `input-image-alt` | Ensure `<input type="image">` elements have alternative text |
| `label-content-name-mismatch` | Ensure that elements labelled through their content must have their visible text as part of their accessible name |
| `label-title-only` | Ensure that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes |
| `label` | Ensure every form element has a label |
| `landmark-banner-is-top-level` | Ensure the banner landmark is at top level |
| `landmark-complementary-is-top-level` | Ensure the complementary landmark or aside is at top level |
| `landmark-contentinfo-is-top-level` | Ensure the contentinfo landmark is at top level |
| `landmark-main-is-top-level` | Ensure the main landmark is at top level |
| `landmark-no-duplicate-banner` | Ensure the document has at most one banner landmark |
| `landmark-no-duplicate-contentinfo` | Ensure the document has at most one contentinfo landmark |
| `landmark-no-duplicate-main` | Ensure the document has at most one main landmark |
| `landmark-one-main` | Ensure the document has a main landmark |
| `landmark-unique` | Ensure landmarks are unique |
| `link-in-text-block` | Ensure links are distinguished from surrounding text in a way that does not rely on color |
| `link-name` | Ensure links have discernible text |
| `list` | Ensure that lists are structured correctly |
| `listitem` | Ensure `<li>` elements are used semantically |
| `marquee` | Ensure `<marquee>` elements are not used |
| `meta-refresh-no-exceptions` | Ensure `<meta http-equiv="refresh">` is not used for delayed refresh (no exceptions) |
| `meta-refresh` | Ensure `<meta http-equiv="refresh">` is not used for delayed refresh |
| `meta-viewport-large` | Ensure `<meta name="viewport">` can scale a significant amount |
| `meta-viewport` | Ensure `<meta name="viewport">` does not disable text scaling and zooming |
| `nested-interactive` | Ensure interactive controls are not nested as they are not always announced by screen readers or can cause focus problems |
| `no-autoplay-audio` | Ensure `<video>` or `<audio>` elements do not autoplay audio for more than 3 seconds without a control mechanism to stop or mute the audio |
| `object-alt` | Ensure `<object>` elements have alternative text |
| `p-as-heading` | Ensure bold, italic text and font-size is not used to style `<p>` elements as a heading |
| `page-has-heading-one` | Ensure that the page, or at least one of its frames contains a level-one heading |
| `presentation-role-conflict` | Ensure elements marked as presentational do not have global ARIA or tabindex so that all screen readers ignore them |
| `region` | Ensure all page content is contained by landmarks |
| `role-img-alt` | Ensure `[role="img"]` and `[role="image"]` elements have alternative text |
| `scope-attr-valid` | Ensure the scope attribute is used correctly on tables |
| `scrollable-region-focusable` | Ensure elements that have scrollable content are accessible by keyboard in Safari |
| `select-name` | Ensure select element has an accessible name |
| `server-side-image-map` | Ensure that server-side image maps are not used |
| `skip-link` | Ensure all skip links have a focusable target |
| `summary-name` | Ensure summary elements have discernible text |
| `svg-img-alt` | Ensure `<svg>` elements with an img, image, graphics-document or graphics-symbol role have accessible text |
| `tabindex` | Ensure tabindex attribute values are not greater than 0 |
| `table-duplicate-name` | Ensure the `<caption>` element does not contain the same text as the summary attribute |
| `table-fake-caption` | Ensure that tables with a caption use the `<caption>` element |
| `target-size` | Ensure touch targets have sufficient size and space |
| `td-has-header` | Ensure that each non-empty data cell in a table larger than 3×3 has one or more table headers |
| `td-headers-attr` | Ensure that each cell using the headers attribute refers only to `<th>` elements in that table |
| `th-has-data-cells` | Ensure that `<th>` elements and elements with role=columnheader/rowheader have data cells they describe |
| `valid-lang` | Ensure lang attributes have valid values |
| `video-caption` | Ensure `<video>` elements have captions |

---

## Common Tag Filters

| Tag | Covers |
|---|---|
| `wcag2a` | WCAG 2.x Level A |
| `wcag2aa` | WCAG 2.x Level AA |
| `wcag2aaa` | WCAG 2.x Level AAA |
| `wcag21a` | WCAG 2.1 Level A additions |
| `wcag21aa` | WCAG 2.1 Level AA additions |
| `wcag22aa` | WCAG 2.2 Level AA additions |
| `best-practice` | Best practices beyond WCAG |
| `experimental` | Experimental rules (not yet stable) |

---

## Example Commands

```bash
# Scan a single page with all rules
axe http://localhost:5173

# Scan with only WCAG 2 AA rules
axe http://localhost:5173 -t wcag2aa

# Scan specific rules only
axe http://localhost:5173 -r color-contrast,aria-hidden-focus,button-name

# Disable specific rules
axe http://localhost:5173 -l region,color-contrast

# Save results to JSON
axe http://localhost:5173 -s results.json

# Exit with code 1 if failures found (useful in CI)
axe http://localhost:5173 -t wcag2aa -q --exit

# Scan with delay (useful for SPAs that need time to render)
axe http://localhost:5173 --load-delay 1000
```
