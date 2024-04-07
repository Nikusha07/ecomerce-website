import React, { useState } from 'react';

const CustomInput = ({ placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <input
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
      placeholder={placeholder} // Use the placeholder prop here
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default CustomInput;
