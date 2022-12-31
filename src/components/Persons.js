const Person = ({ id, name, number, removePerson }) => (
  <p>
    {name} {number}{" "}
    <button onClick={() => removePerson({ id, name })}>delete</button>
  </p>
);

const Persons = ({ persons, removePerson }) =>
  persons.map((person) => (
    <Person {...person} removePerson={removePerson} key={person.id} />
  ));

export default Persons;
