import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

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

  const removePersonFromState = (id) =>
    setPersons(persons.filter((person) => person.id !== id));

  const removePerson = (id) =>
    personsService.removePerson(id).then(() => removePersonFromState(id));

  useEffect(() => {
    personsService.getPersons().then(setPersons);
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
        setPersons={setPersons}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
