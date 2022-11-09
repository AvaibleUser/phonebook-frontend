import React from 'react';
import { useState } from 'react';

const Number = ({ name }) => <p>{name}</p>;

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const catchNameChange = ({ target: { value } }) => {
    setNewName(value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName}));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={catchNameChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Number {...person} key={person.name} />
      ))}
    </div>
  );
};

export default App;
