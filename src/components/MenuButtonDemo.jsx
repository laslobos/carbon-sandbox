import React from 'react';
import { FeatureFlags, MenuButton, MenuItem } from '@carbon/react';

/**
 * MenuButton rendered with the v12 FeatureFlags provider.
 * enableV12Release and enableV12DynamicFloatingStyles activate the
 * v12 behaviour for all Carbon components in this subtree.
 */
export function MenuButtonV12() {
  return (
    <FeatureFlags enableV12Release enableV12DynamicFloatingStyles>
      <div
        className="cds--v12"
        data-a11y-scope="v12"
        data-a11y-open-trigger="button"
        data-a11y-popup=".cds--menu"
      >
      <MenuButton
        kind="primary"
        label="Actions"
        menuAlignment="bottom"
        size="lg"
      >
        <MenuItem label="First action with a long label description" />
        <MenuItem label="Second action" />
        <MenuItem label="Third action" disabled />
      </MenuButton>
      </div>
    </FeatureFlags>
  );
}
