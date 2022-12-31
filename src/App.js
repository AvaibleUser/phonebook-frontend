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
  const [error, setError] = useState(false);

  const filteredPersons = filterPersons(filter, persons);

  const notFoundPerson = ({ id, name }) => {
    setPersons(persons.filter((person) => person.id !== id));
    setMessage(`Information of ${name} has already been removed`);
    setError(true);
  };

  const removePerson = async ({ id, name }) => {
    try {
      await personsService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
      setMessage(`Removed ${name}`);
    } catch {
      notFoundPerson({ id, name });
    }
  };

  const addPerson = async ({ name, number }) => {
    const person = await personsService.add({ name, number });
    setPersons(persons.concat(person));
    setMessage(`Added ${name}`);
  };

  const modifyPerson = async (previousPerson) => {
    try {
      const newPerson = await personsService.modify(previousPerson);
      setPersons(
        persons.map((person) =>
          person.id !== newPerson.id ? person : newPerson
        )
      );
      setMessage(`Number of ${newPerson.name} changed to ${newPerson.number}`);
    } catch {
      notFoundPerson(previousPerson);
    }
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
      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 5000);
    }
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification error={error} message={message} setMessage={setMessage} />

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
