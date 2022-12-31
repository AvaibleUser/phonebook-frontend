import React from "react";
import { useState, useEffect } from "react";

import Filter from "./components/LabeledInput";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

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
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons = filterPersons(filter, persons);

  const removePerson = ({ id, name }) =>
    personsService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      setMessage(`Removed ${name}`);
    });

  const addPerson = async ({ name, number }) => {
    const person = await personsService.add({ name, number });
    setPersons(persons.concat(person));
    setMessage(`Added ${name}`);
  };

  const modifyPerson = async (previousPerson) => {
    const newPerson = await personsService.modify(previousPerson);
    setPersons(
      persons.map((person) => (person.id !== newPerson.id ? person : newPerson))
    );
    setMessage(`Number of ${newPerson.name} changed to ${newPerson.number}`);
  };

  const addOrModfyPerson = ({ name, number }) => {
    const previousPerson = persons.find((person) => person.name === name);

    if (!previousPerson) {
      addPerson({ name, number });
      return;
    }
    modifyPerson({ ...previousPerson, number });
  };

  useEffect(() => {
    personsService.getAll().then(setPersons);
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 5000);
    }
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} setMessage={setMessage} />

      <Filter label="filter shown with" value={filter} setValue={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        setName={setNewName}
        setNumber={setNewNumber}
        addPerson={addOrModfyPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
