import React, { useState } from 'react';

const CustomInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <input
      style={{
        borderWidth: '2px',
        marginBottom: '4px',
        borderStyle: 'solid',
        borderColor: isFocused ? '#3182ce' : '#8b8787', 
        borderRadius: '0.375rem',
        padding: '0.25rem',
        width: '100%',
        outline: 'none',
        margin: '0.5rem',
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default CustomInput;
