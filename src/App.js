import React from 'react';
import { useState } from 'react';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PersonsFilter from './components/PersonsFilter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const _setPersons = (persons) => {
    setFilter('');
    setPersons(persons);
    setFilteredPersons(persons);
  };

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
