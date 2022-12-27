import React from "react";
import { useState, useEffect } from "react";

import Filter from "./components/LabeledInput";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

import personsService from "./services/persons";

const filterPersons = (name, persons) => {
  if (!name) return persons;

  const nameRegex = new RegExp(name, "i");
  return persons.filter((person) => nameRegex.test(person.name));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons = filterPersons(filter, persons);

  const removePerson = (id) =>
    personsService
      .remove(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)));

  const addPerson = async ({ name, number }) => {
    const previousPerson = persons.find((person) => person.name === name);

    if (!previousPerson) {
      const person = await personsService.add({ name, number });

      setPersons(persons.concat(person));
      return;
    }

    const newPerson = await personsService.modify({
      ...previousPerson,
      number,
    });

    setPersons(
      persons.map((person) => (person.id !== newPerson.id ? person : newPerson))
    );
  };

  useEffect(() => {
    personsService.getAll().then(setPersons);
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter label="filter shown with" value={filter} setValue={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        setName={setNewName}
        setNumber={setNewNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
