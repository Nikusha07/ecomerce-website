import React, { useState } from 'react';

const InputComponent = ({ placeholder, value, height, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyles = {
    fontSize: '20px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: isFocused ? '#3182ce' : '#8b8787',
    borderRadius: '0.375rem',
    padding: '0.25rem',
    width: '100%',
    outline: 'none',
    height: height || 'auto',
  };

  return (
    <input
      style={inputStyles}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default InputComponent;
