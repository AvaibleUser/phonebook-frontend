import React from 'react';
import { useState } from 'react';

const Person = ({ name, number }) => <p>{name} {number}</p>;

const Input = ({ label, value, setValue }) => {
  const catchValueChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <div>
      {label}: <input value={value} onChange={catchValueChange} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (!persons.find(({ number }) => number === newNumber)) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Input label="name" value={newName} setValue={setNewName} />
        <Input label="number" value={newNumber} setValue={setNewNumber} />
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person {...person} key={person.name} />
      ))}
    </div>
  );
};

export default App;
