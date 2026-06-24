import React, { useState, useRef, useEffect } from 'react';
import { TextInput, Tag, Stack } from '@carbon/react';

const suggestions = [
  'React',
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'PHP',
  'C#',
  'Scala',
  'Perl',
  'Haskell',
  'Elixir',
  'Dart'
];

function TagInputAccessible() {
  const [tags, setTags] = useState(['React', 'TypeScript']);
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const liveRegionRef = useRef(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
          !tags.includes(suggestion)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      
      // Announce filtered results to screen readers
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = `${filtered.length} suggestion${filtered.length !== 1 ? 's' : ''} available`;
      }
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = '';
      }
    }
  }, [inputValue, tags]);

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInputValue('');
      setShowSuggestions(false);
      setFocusedIndex(-1);
      
      // Announce tag addition
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = `${tag} added`;
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    
    // Announce tag removal
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `${tagToRemove} removed`;
    }
    
    // Return focus to input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < filteredSuggestions.length) {
        addTag(filteredSuggestions[focusedIndex]);
      } else if (inputValue.trim()) {
        addTag(inputValue.trim());
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedIndex(-1);
    }
  };

  // Update aria-activedescendant when focused index changes
  useEffect(() => {
    if (inputRef.current) {
      if (focusedIndex >= 0) {
        inputRef.current.setAttribute('aria-activedescendant', `suggestion-${focusedIndex}`);
      } else {
        inputRef.current.removeAttribute('aria-activedescendant');
      }
    }
  }, [focusedIndex]);

  return (
    <div style={{ width: 400, position: 'relative' }}>
      <Stack gap={4}>
        <div>
          <label
            id="tag-input-label"
            htmlFor="tag-input-accessible"
            style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}
          >
            Select Technologies (Accessible)
          </label>
          <TextInput
            id="tag-input-accessible"
            ref={inputRef}
            placeholder="Type to search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue && setShowSuggestions(filteredSuggestions.length > 0)}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            aria-controls="suggestions-listbox"
            aria-labelledby="tag-input-label"
          />
        </div>

        {showSuggestions && (
          <div
            id="suggestions-listbox"
            ref={suggestionsRef}
            role="listbox"
            aria-label="Suggestions"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 1000,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={suggestion}
                id={`suggestion-${index}`}
                role="option"
                aria-selected={index === focusedIndex}
                onClick={() => addTag(suggestion)}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  backgroundColor: index === focusedIndex ? '#e0e0e0' : 'white',
                  borderBottom: index < filteredSuggestions.length - 1 ? '1px solid #e0e0e0' : 'none'
                }}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {tags.map((tag) => (
              <Tag
                key={tag}
                type="blue"
                filter
                onClose={() => removeTag(tag)}
                title={`Remove ${tag}`}
              >
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </Stack>
      
      {/* Screen reader live region for announcements */}
      <div
        ref={liveRegionRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      />
    </div>
  );
}

export default TagInputAccessible;

// Made with Bob