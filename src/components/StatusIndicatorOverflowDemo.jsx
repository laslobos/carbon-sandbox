import React, { useRef, useState, useEffect } from 'react';
import {
  Stack,
  Tile,
  Tooltip,
  preview__IconIndicator as IconIndicator,
  UnorderedList,
  ListItem,
} from '@carbon/react';

function CustomIconIndicator({
  threshold = 220,
  label,
  containerStyle,
  ...rest
}) {
  const wrapperRef = useRef(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return undefined;

    const el = wrapperRef.current;

    const updateSize = () => {
      const width = el.offsetWidth;
      setIsCompact(width < threshold);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  const indicator = (
    <IconIndicator
      {...rest}
      label={label}
      {...(isCompact ? { hideLabel: true } : {})}
    />
  );

  return (
    <div ref={wrapperRef} style={containerStyle}>
      {isCompact && label ? (
        <Tooltip
          align="bottom-start"
          label={label}
          className="cds--icon-tooltip">
          <span style={{ display: 'inline-flex' }}>{indicator}</span>
        </Tooltip>
      ) : (
        indicator
      )}
    </div>
  );
}

function DemoRow({ title, description, children }) {
  return (
    <Tile>
      <Stack gap={5}>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {children}
      </Stack>
    </Tile>
  );
}

function AccessibleIconOnlyExamples() {
  const accessibleCompactStyle = {
    inlineSize: '3rem',
    minInlineSize: '3rem',
  };

  return (
    <DemoRow
      title="Accessible icon-only versions"
      description="These examples keep the status indicator non-interactive while exposing the text alternative through accessibility semantics. The constrained containers make it easy to test compact tooltip behavior without resizing the entire screen.">
      <Stack gap={5}>
        <div>
          <h4>Using aria-label</h4>
          <p>
            Wrap the icon-only indicator in a neutral element with an accessible name.
            This is the simplest option when the status text is short and self-contained.
          </p>
          <div style={accessibleCompactStyle}>
            <Tooltip
              align="bottom-start"
              label="Succeeded"
              className="cds--icon-tooltip">
              <span aria-label="Succeeded" style={{ display: 'inline-flex' }}>
                <IconIndicator
                  kind="succeeded"
                  label="Succeeded"
                  hideLabel
                  iconDescription="Succeeded"
                />
              </span>
            </Tooltip>
          </div>
        </div>

        <div>
          <h4>Using aria-labelledby</h4>
          <p>
            Reference hidden text when you want a single source of truth for the status
            label or need to reuse a richer description.
          </p>
          <span
            id="status-indicator-stable-label"
            style={{
              position: 'absolute',
              inlineSize: '1px',
              blockSize: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}>
            Stable
          </span>
          <div style={accessibleCompactStyle}>
            <Tooltip
              align="bottom-start"
              label="Stable"
              className="cds--icon-tooltip">
              <span
                aria-labelledby="status-indicator-stable-label"
                style={{ display: 'inline-flex' }}>
                <IconIndicator
                  kind="normal"
                  label="Stable"
                  hideLabel
                  iconDescription="Stable"
                />
              </span>
            </Tooltip>
          </div>
        </div>

        <UnorderedList>
          <ListItem>Neither version is tabbable because the icon is not interactive.</ListItem>
          <ListItem>
            The tooltip remains optional visual support and is not the only source of the
            status text.
          </ListItem>
          <ListItem>
            Each example is placed in a fixed narrow container so you can test compact
            layouts without resizing the entire viewport.
          </ListItem>
        </UnorderedList>
      </Stack>
    </DemoRow>
  );
}

function StatusIndicatorOverflowDemo() {
  const roomyStyle = {
    inlineSize: '20rem',
    minInlineSize: '20rem',
  };

  const compactStyle = {
    inlineSize: '3rem',
    minInlineSize: '3rem',
  };

  return (
    <Stack gap={7}>
      <DemoRow
        title="Without overflow"
        description="When there is enough horizontal space, the label remains visible next to the status indicator.">
        <Stack gap={4}>
          <CustomIconIndicator
            kind="succeeded"
            label="Succeeded"
            iconDescription="Succeeded"
            containerStyle={roomyStyle}
          />
          <CustomIconIndicator
            kind="normal"
            label="Stable"
            status="Stable"
            iconDescription="Stable"
            containerStyle={roomyStyle}
          />
        </Stack>
      </DemoRow>

      <DemoRow
        title="With overflow"
        description="When the available space is constrained, the label is hidden and exposed through a tooltip on hover or focus.">
        <Stack gap={4}>
          <CustomIconIndicator
            kind="succeeded"
            label="Succeeded"
            iconDescription="Succeeded"
            containerStyle={compactStyle}
          />
          <CustomIconIndicator
            kind="normal"
            label="Stable"
            status="Stable"
            iconDescription="Stable"
            containerStyle={compactStyle}
          />
        </Stack>
      </DemoRow>

      <AccessibleIconOnlyExamples />
    </Stack>
  );
}

export default StatusIndicatorOverflowDemo;

// Made with Bob
