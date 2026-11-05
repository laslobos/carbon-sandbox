import React, { useState, useRef } from 'react';
import { Button, Stack, FlexGrid, Row, Column } from '@carbon/react';
import {
  preview__Coachmark as Coachmark,
  preview__CoachmarkBeacon as CoachmarkBeacon,
} from '@carbon/ibm-products';

function CoachmarkDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const beaconButtonRef = useRef(null);

  const handleBeaconClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <FlexGrid fullWidth>
      <Row>
        <Column sm={4} md={8} lg={{ span: 8, offset: 4 }}>
          <Stack gap={6}>
            {/* Prior interactive element for backwards-tabbing verification */}
            <Button kind="secondary" size="md">
              Before Coachmark (Test Button 0)
            </Button>

            {/* Coachmark and Trigger Beacon */}
            <Coachmark
              open={isOpen}
              onClose={handleClose}
              align="bottom"
            >
              <CoachmarkBeacon
                label="Show onboarding guide"
                buttonProps={{
                  onClick: handleBeaconClick,
                  id: 'coachmark-beacon-button',
                  ref: beaconButtonRef,
                }}
              />
              <Coachmark.Content>
                <Coachmark.Content.Header closeIconDescription="Close" />
                <Coachmark.Content.Body>
                  <h2>New Feature Spotlight</h2>
                  <p>
                    This is an interactive Coachmark guide powered by Carbon for IBM Products components.
                  </p>
                  <Button kind="primary" size="sm" onClick={handleClose}>
                    Got it
                  </Button>
                </Coachmark.Content.Body>
              </Coachmark.Content>
            </Coachmark>

            {/* Successive interactive test elements */}
            <Stack gap={4}>
              <Button kind="primary" size="md">
                After Coachmark (Test Button 1)
              </Button>
              <Button kind="secondary" size="md">
                After Coachmark (Test Button 2)
              </Button>
              <Button kind="tertiary" size="md">
                After Coachmark (Test Button 3)
              </Button>
            </Stack>
          </Stack>
        </Column>
      </Row>
    </FlexGrid>
  );
}

export default CoachmarkDemo;
