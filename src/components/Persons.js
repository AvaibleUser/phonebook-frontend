import React from 'react';

const Person = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

const Persons = ({ persons }) =>
  persons.map((person) => <Person {...person} key={person.id} />);

export default Persons;
