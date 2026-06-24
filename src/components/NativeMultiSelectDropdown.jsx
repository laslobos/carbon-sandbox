import React, { useState, useRef, useEffect } from 'react';

function NativeMultiSelectDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(['Option 1', 'Option 2']);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0);
    }
  };

  const toggleOption = (option) => {
    setSelectedItems(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          toggleOption(options[focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'Tab':
        // Let Tab close the dropdown and move focus naturally
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      items[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  return (
    <div style={{ width: 300 }} ref={dropdownRef}>
      <label 
        id="native-dropdown-label" 
        style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}
      >
        Native Multiselect Dropdown
      </label>
      
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="native-dropdown-label"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          padding: '8px 32px 8px 12px',
          border: '1px solid #8d8d8d',
          borderBottom: isOpen ? 'none' : '1px solid #8d8d8d',
          borderRadius: isOpen ? '4px 4px 0 0' : '4px',
          background: 'white',
          textAlign: 'left',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '14px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {selectedItems.length > 0 && (
          <span style={{
            background: '#e0e0e0',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            {selectedItems.length}
          </span>
        )}
        <span style={{ flex: 1 }}>Multiselect Label</span>
        <span style={{ position: 'absolute', right: '12px' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby="native-dropdown-label"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            border: '1px solid #8d8d8d',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            background: 'white',
            maxHeight: '200px',
            overflowY: 'auto',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          {options.map((option, index) => {
            const isSelected = selectedItems.includes(option);
            const isFocused = focusedIndex === index;
            
            return (
              <li
                key={option}
                role="option"
                aria-selected={isSelected}
                onClick={() => toggleOption(option)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  background: isFocused ? '#e0e0e0' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  tabIndex={-1}
                  style={{ margin: 0 }}
                />
                {option}
              </li>
            );
          })}
        </ul>
      )}

      <p style={{ fontSize: '12px', marginTop: '8px', color: '#525252' }}>
        This is helper text
      </p>
    </div>
  );
}

export default NativeMultiSelectDropdown;

// Made with Bob