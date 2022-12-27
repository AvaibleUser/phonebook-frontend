import React from "react";

const Person = ({ id, name, number, removePerson }) => (
  <p>
    {name} {number} <button onClick={() => removePerson(id)}>delete</button>
  </p>
);

const Persons = ({ persons, removePerson }) =>
  persons.map((person) => (
    <Person {...person} removePerson={removePerson} key={person.id} />
  ));

export default Persons;
