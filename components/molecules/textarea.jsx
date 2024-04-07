// TextArea.js
import React, { useState } from 'react';

const TextArea = () => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <textarea
      style={{
        fontSize: '20px',
        borderWidth: '2px',
        marginBottom: '4px',
        borderStyle: 'solid',
        borderColor: isFocused ? '#3182ce' : '#8b8787', 
        borderRadius: '0.375rem',
        padding: '0.25rem',
        width: '100%',
        outline: 'none',
        marginBottom: '10px',
      }}
      placeholder="description"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default TextArea;
