import React from 'react';

const PersonsFilter = ({ filter, setFilter, persons, setFilteredPersons }) => {
  const filterPersons = ({ target: { value: name } }) => {
    const nameRegex = new RegExp(name, 'i');
    const newFilteredPersons = persons.filter((person) =>
      nameRegex.test(person.name)
    );

    setFilteredPersons(newFilteredPersons);
    setFilter(name);
  };

  return (
    <div>
      filter shown with <input value={filter} onChange={filterPersons} />
    </div>
  );
};

export default PersonsFilter;
