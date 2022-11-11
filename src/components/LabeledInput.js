import React from 'react';

const LabeledInput = ({ label, value, setValue }) => {
  const catchValueChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <div>
      {label}: <input value={value} onChange={catchValueChange} />
    </div>
  );
};

export default LabeledInput;