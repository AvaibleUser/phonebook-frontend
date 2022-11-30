import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PersonsFilter from './components/PersonsFilter';

const url = '/api/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const _setPersons = (persons) => {
    setFilter('');
    setPersons(persons);
    setFilteredPersons(persons);
  };

  useEffect(() => {
    const setPersonsFromServer = (res) => _setPersons(res.data);

    axios
      .get(url)
      .then(setPersonsFromServer);
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonsFilter {...{ filter, setFilter, persons, setFilteredPersons }} />

      <h3>Add a new</h3>
      <PersonForm
        {...{
          newName,
          newNumber,
          persons,
          setNewName,
          setNewNumber,
          setPersons: _setPersons,
        }}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
