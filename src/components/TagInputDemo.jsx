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

function TagInputDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript']);
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
          !tags.includes(suggestion)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, tags]);

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInputValue('');
      setShowSuggestions(false);
      setFocusedIndex(-1);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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

  return (
    <div style={{ width: 400, position: 'relative' }}>
      <Stack gap={4}>
        <div>
          <label htmlFor="tag-input-demo" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Select Technologies
          </label>
          <TextInput
            id="tag-input-demo"
            ref={inputRef}
            placeholder="Type to search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue && setShowSuggestions(filteredSuggestions.length > 0)}
          />
        </div>

        {showSuggestions && (
          <div
            ref={suggestionsRef}
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
              >
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </Stack>
    </div>
  );
}

export default TagInputDemo;

// Made with Bob