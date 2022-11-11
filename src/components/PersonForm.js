import React from 'react';

import LabeledInput from './LabeledInput';

const PersonForm = ({
  newName,
  newNumber,
  persons,
  setNewName,
  setNewNumber,
  setPersons,
}) => {
  const addPerson = (event) => {
    event.preventDefault();

    setPersons(
      persons.concat({
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      })
    );
    setNewName('');
    setNewNumber('');
  };

  return (
    <form>
      <LabeledInput label="name" value={newName} setValue={setNewName} />
      <LabeledInput label="number" value={newNumber} setValue={setNewNumber} />
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
