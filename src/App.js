import React from 'react';
import { useState } from 'react';

const Person = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

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
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

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

  const filterPersons = (name) => {
    const nameRegex = new RegExp(name, 'i');
    const newFilteredPersons = persons.filter((person) =>
      nameRegex.test(person.name)
    );

    setFilteredPersons(newFilteredPersons);
    setFilter(name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Input label="filter shown with" value={filter} setValue={filterPersons} />
      </form>
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
      {filteredPersons.map((person) => (
        <Person {...person} key={person.name} />
      ))}
    </div>
  );
};

export default App;
