import React from "react";

import LabeledInput from "./LabeledInput";

import personsService from "../services/persons";

const PersonForm = ({ name, number, setName, setNumber, setPersons }) => {
  const addPerson = async (event) => {
    event.preventDefault();

    const person = await personsService.addPerson({ name, number });

    setName("");
    setNumber("");
    setPersons((persons) => persons.concat(person));
  };

  return (
    <form>
      <LabeledInput label="name:" value={name} setValue={setName} />
      <LabeledInput label="number:" value={number} setValue={setNumber} />
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
