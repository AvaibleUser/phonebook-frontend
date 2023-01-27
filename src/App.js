import React from "react";
import { useState, useEffect } from "react";

import Filter from "./components/LabeledInput";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notifications from "./components/Notifications";

import personsService from "./services/persons";

let cantNotifications = 0;

const filterPersons = (name, persons) => {
  if (!name) return persons;

  const nameRegex = new RegExp(name, "i");
  return persons.filter((person) => nameRegex.test(person.name));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredPersons = filterPersons(filter, persons);

  const addMessage = (message, error = false) => {
    setMessages([...messages, { message, error, key: cantNotifications++ }]);
  };

  const notFoundPerson = ({ id, name }) => {
    setPersons(persons.filter((person) => person.id !== id));
    addMessage(`Information of ${name} has already been removed`, true);
  };

  const removePerson = async ({ id, name }) => {
    await personsService.remove(id);
    setPersons(persons.filter((person) => person.id !== id));
    addMessage(`Removed ${name}`);
  };

  const addPerson = async (name, number) => {
    try {
      const person = await personsService.add({ name, number });
      setPersons(persons.concat(person));
      addMessage(`Added ${name}`);
    } catch (error) {
      console.error(error);

      if (error.response.data) {
        const message = error.response.data.error || error.response.data;
        addMessage(message, true);
      } else {
        notFoundPerson(previousPerson);
      }
    }
  };

  const modifyPerson = async (previousPerson) => {
    try {
      const newPerson = await personsService.modify(previousPerson);
      setPersons(
        persons.map((person) =>
          person.id !== newPerson.id ? person : newPerson
        )
      );
      addMessage(`Number of ${newPerson.name} changed to ${newPerson.number}`);
    } catch (error) {
      console.error(error);

      if (error.response.data) {
        const message = error.response.data.error || error.response.data;
        addMessage(message, true);
      } else {
        notFoundPerson(previousPerson);
      }
    }
  };

  const addOrModifyPerson = ({ name, number }) => {
    const previousPerson = persons.find((person) => person.name === name);

    if (!previousPerson) {
      addPerson(name, number);
      return;
    }
    modifyPerson({ ...previousPerson, number });
  };

  useEffect(() => {
    personsService.getAll().then(setPersons);
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notifications messages={messages} setMessages={setMessages} />

      <Filter label="filter shown with" value={filter} setValue={setFilter} />

      <h3>Add a new</h3>
      <PersonForm addPerson={addOrModifyPerson} />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
