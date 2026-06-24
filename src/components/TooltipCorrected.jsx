import React, { useState, useRef, useId } from 'react';
import { Button } from '@carbon/react';

/**
 * Corrected Tooltip Implementation
 * Uses aria-describedby instead of aria-labelledby for buttons with visible text
 * This ensures screen readers announce: "Button text, button, tooltip text"
 * instead of: "Tooltip text, button"
 */
function TooltipCorrected() {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();
  const buttonRef = useRef(null);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const handleFocus = () => setIsVisible(true);
  const handleBlur = () => setIsVisible(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Button
        ref={buttonRef}
        aria-describedby={isVisible ? tooltipId : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        Search documents
      </Button>
      
      {isVisible && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: '8px',
            padding: '8px 12px',
            backgroundColor: '#161616',
            color: '#ffffff',
            fontSize: '14px',
            lineHeight: '18px',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            zIndex: 6000,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
          }}
        >
          This is an AI search
          <span
            style={{
              content: '',
              position: 'absolute',
              top: '100%',
              left: '16px',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #161616'
            }}
          />
        </span>
      )}
    </div>
  );
}

export default TooltipCorrected;

// Made with Bob
