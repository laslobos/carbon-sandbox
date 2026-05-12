# AI Chat Agent + Tearsheet Overlay Solution

## Problem Statement

When using the AI Chat Agent component (positioned left) alongside a Tearsheet component, they may overlay each other causing accessibility issues:

1. **Z-index conflicts**: Both components may use similar z-index values, causing one to cover the other
2. **Focus management**: Keyboard focus may get trapped or jump unexpectedly between overlapping components
3. **Interactive elements**: Buttons and controls may become unreachable when components overlap
4. **Screen reader confusion**: Overlapping components cause orientation and navigation issues

## Solution Architecture

### Phase 1: Remove SideNav Conflicts (Completed)

The application previously used a left SideNav which would conflict with the left-positioned Agent sidebar. This has been resolved by:

**Moving navigation to Header**: All component navigation is now in a HeaderMenu dropdown in the UI Shell Header, eliminating the left SideNav entirely.

### Phase 2: Test and Resolve Agent/Tearsheet Overlay (Next Step)

With the SideNav removed, you can now properly test the Agent and Tearsheet components together to identify and resolve any z-index overlay issues.

### Expected Z-index Layering

```
Layer 4: Tearsheet overlay     (z-index: ~9000+)  ← Should be on top
Layer 3: Agent sidebar          (z-index: ~8000-9000)
Layer 2: Page content           (z-index: 0)
Layer 1: Header                 (z-index: 8000)
```

## Implementation

### Files Modified

1. **`src/App.jsx`**
   - Removed SideNav components
   - Added HeaderNavigation with HeaderMenu
   - All component links now in "Components" dropdown menu
   - Cleaner, more compact navigation

2. **`src/pages/AgentPage.jsx`**
   - Testing page for Agent + Tearsheet
   - Includes problem description and expected behavior
   - Provides test controls for both components
   - Ready for component integration

### Navigation Structure

```
Header
├── IBM Carbon Sandbox (Home link)
└── Components (HeaderMenu)
    ├── DataTable
    ├── TreeView
    ├── NumberInput
    ├── Tooltip
    ├── MultiSelect
    └── AI Agent
```

## Next Steps

### 1. Install Dependencies

```bash
npm install @carbon/ai-chat
```

### 2. Add Agent Component

In `src/pages/AgentPage.jsx`, replace the first TODO comment with:

```jsx
import { Agent } from '@carbon/ai-chat';

// In the component (before the Stack):
<Agent
  position="left"
  open={isAgentOpen}
  onClose={() => setIsAgentOpen(false)}
  // Add your Agent configuration
>
  {/* Agent content */}
</Agent>
```

### 3. Add Tearsheet Component

In `src/pages/AgentPage.jsx`, replace the second TODO comment with:

```jsx
import { Tearsheet } from '@carbon/react';

// In the component (after the test controls):
<Tearsheet
  open={isTearsheetOpen}
  onClose={() => setIsTearsheetOpen(false)}
  // Add your Tearsheet configuration
>
  <div style={{ padding: '2rem' }}>
    <h3>Tearsheet Content</h3>
    <p>This tearsheet should appear above the Agent sidebar.</p>
  </div>
</Tearsheet>
```

### 4. Test the Overlay Behavior

1. Navigate to `/agent` in your application
2. Click "Open Agent Sidebar"
3. Click "Open Tearsheet"
4. **Verify**: Tearsheet should appear above the Agent
5. **Test keyboard navigation**: Tab through interactive elements
6. **Test Escape key**: Should close the topmost component (Tearsheet)
7. **Use browser DevTools**: Inspect z-index values of both components

### 5. Troubleshooting Z-index Issues

If the Tearsheet appears **behind** the Agent:

#### Option A: Adjust Tearsheet Z-index (Preferred)
```jsx
<Tearsheet
  open={isTearsheetOpen}
  onClose={() => setIsTearsheetOpen(false)}
  style={{ zIndex: 9999 }} // Ensure it's above Agent
>
```

#### Option B: Adjust Agent Z-index
```jsx
<Agent
  position="left"
  open={isAgentOpen}
  onClose={() => setIsAgentOpen(false)}
  style={{ zIndex: 8500 }} // Lower than Tearsheet
>
```

#### Option C: Use CSS Custom Properties
Create a CSS file to manage z-index values:

```css
/* src/styles/z-index.scss */
:root {
  --z-index-agent: 8500;
  --z-index-tearsheet: 9500;
}

.agent-component {
  z-index: var(--z-index-agent) !important;
}

.tearsheet-component {
  z-index: var(--z-index-tearsheet) !important;
}
```

### 6. Accessibility Testing Checklist

- [ ] Both components can be open simultaneously
- [ ] Tearsheet appears above Agent (no overlap issues)
- [ ] Keyboard navigation works correctly (Tab, Shift+Tab)
- [ ] Escape key closes the appropriate component
- [ ] Focus is properly managed when opening/closing
- [ ] Screen reader announces components correctly
- [ ] No interactive elements are unreachable
- [ ] Focus trap works in Tearsheet when open
- [ ] Agent remains accessible when Tearsheet is open

## Carbon Design System Z-index Reference

- **Header**: z-index 8000
- **SideNav**: z-index 8000 (removed in this solution)
- **Modal/Tearsheet**: z-index 9000+
- **Agent**: Check component documentation (typically 8000-9000)

## Benefits of Header Navigation

1. **No SideNav conflicts**: Eliminates z-index issues with left-positioned components
2. **More screen space**: Full width available for content and Agent sidebar
3. **Cleaner UI**: Single navigation location in the header
4. **Better for testing**: Clear separation between app navigation and component testing
5. **Responsive**: HeaderMenu collapses on smaller screens

## Testing the Solution

### Test Case 1: Agent Only
1. Open Agent sidebar
2. Verify it appears on the left
3. Test keyboard navigation within Agent
4. Close Agent with Escape or close button

### Test Case 2: Tearsheet Only
1. Open Tearsheet
2. Verify it appears as an overlay
3. Test keyboard navigation within Tearsheet
4. Close Tearsheet with Escape or close button

### Test Case 3: Both Open (Critical Test)
1. Open Agent sidebar
2. Open Tearsheet
3. **Verify**: Tearsheet appears above Agent
4. **Verify**: Can interact with Tearsheet
5. **Verify**: Agent is visible but behind Tearsheet
6. Close Tearsheet - Agent should still be open
7. Close Agent

### Test Case 4: Keyboard Navigation
1. Open both components
2. Tab through all interactive elements
3. Verify focus order is logical
4. Verify no focus traps (except intentional in Tearsheet)
5. Test Escape key behavior

## Common Issues and Solutions

### Issue: Tearsheet appears behind Agent
**Cause**: Agent has higher z-index than Tearsheet  
**Solution**: Increase Tearsheet z-index or decrease Agent z-index

### Issue: Can't interact with Agent when Tearsheet is open
**Expected behavior**: This is correct - Tearsheet should have focus trap  
**Solution**: Close Tearsheet first, then interact with Agent

### Issue: Both components have same z-index
**Cause**: Default z-index values conflict  
**Solution**: Explicitly set z-index values with proper layering

### Issue: Focus jumps unexpectedly
**Cause**: Improper focus management  
**Solution**: Ensure Tearsheet has proper focus trap implementation

## Resources

- [Carbon AI Chat Documentation](https://github.com/carbon-design-system/carbon-ai-chat)
- [Carbon Tearsheet Component](https://react.carbondesignsystem.com/?path=/docs/components-tearsheet--overview)
- [Carbon Header Components](https://react.carbondesignsystem.com/?path=/docs/components-ui-shell-header--overview)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Created**: 2026-05-01  
**Updated**: 2026-05-01  
**Author**: Bob (AI Assistant)  
**Status**: Phase 1 Complete - Ready for Agent/Tearsheet testing