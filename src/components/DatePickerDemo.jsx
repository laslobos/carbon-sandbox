import React from 'react';
import { FeatureFlags, DatePicker, DatePickerInput } from '@carbon/react';

/**
 * DatePicker rendered with the v12 FeatureFlags provider.
 * Matches the same flags used across all v12 components in this sandbox.
 */
export function DatePickerV12() {
  return (
    <FeatureFlags enableV12Release enableV12DynamicFloatingStyles>
      <div
        data-a11y-scope="v12"
        data-a11y-open-trigger="#date-picker-v12"
        data-a11y-popup=".flatpickr-calendar.open"
      >
        <DatePicker datePickerType="single">
          <DatePickerInput
            id="date-picker-v12"
            placeholder="mm/dd/yyyy"
            labelText="Date picker label"
            size="md"
          />
        </DatePicker>
      </div>
    </FeatureFlags>
  );
}
