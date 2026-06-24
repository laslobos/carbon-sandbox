import React, { useState, useEffect, useRef } from 'react';
import { MultiSelect, DismissibleTag } from '@carbon/react';

const items = [
  { id: 'option-1', text: 'Option 1' },
  { id: 'option-2', text: 'Option 2' },
  { id: 'option-3', text: 'Option 3' },
  { id: 'option-4', text: 'Option 4' },
  { id: 'option-5', text: 'Option 5' },
];

function MultiSelectAccessibleHover() {
  const [selectedItems, setSelectedItems] = useState([items[0], items[1]]);
  const wrapperRef = useRef(null);
  const [fieldBounds, setFieldBounds] = useState({ top: 0, height: 40 });

  useEffect(() => {
    if (!wrapperRef.current) return;

    const field = wrapperRef.current.querySelector('.cds--list-box__field');
    if (field) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const fieldRect = field.getBoundingClientRect();
      setFieldBounds({
        top: fieldRect.top - wrapperRect.top,
        height: fieldRect.height,
      });
    }

    // Hide native clear button via direct DOM — CSS specificity is not reliable enough
    const nativeBtn = wrapperRef.current.querySelector('.cds--list-box__selection');
    if (nativeBtn) {
      nativeBtn.style.setProperty('display', 'none', 'important');
    }
  }, [selectedItems]);

  const handleChange = ({ selectedItems: newItems }) => {
    setSelectedItems(newItems);
  };

  return (
    <div ref={wrapperRef} className="ms-hover-wrapper" style={{ position: 'relative', width: 300 }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-accessible-hover"
        titleText="Multiselect with dismissible clear-all"
        helperText="Dismiss the tag to clear all selections"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectedItems={selectedItems}
        onChange={handleChange}
        selectionFeedback="top-after-reopen"
      />

      {selectedItems.length > 0 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            right: '2.5rem',
            top: fieldBounds.top,
            height: fieldBounds.height,
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <DismissibleTag
            text={String(selectedItems.length)}
            title="Clear all selected items"
            type="blue"
            size="md"
            onClose={(e) => {
              e.stopPropagation();
              setSelectedItems([]);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default MultiSelectAccessibleHover;

// Made with Bob
