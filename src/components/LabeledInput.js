const LabeledInput = ({ label, value, setValue }) => {
  const catchValueChange = ({ target }) => setValue(target.value);

  return (
    <div>
      {label} <input value={value} onChange={catchValueChange} />
    </div>
  );
};

export default LabeledInput;
