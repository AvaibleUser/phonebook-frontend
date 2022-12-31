import LabeledInput from "./LabeledInput";

const PersonForm = ({ name, number, setName, setNumber, addPerson }) => {
  const addPersonOnClick = (event) => {
    event.preventDefault();

    setName("");
    setNumber("");
    addPerson({ name, number });
  };

  return (
    <form>
      <LabeledInput label="name:" value={name} setValue={setName} />
      <LabeledInput label="number:" value={number} setValue={setNumber} />
      <div>
        <button type="submit" onClick={addPersonOnClick}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
