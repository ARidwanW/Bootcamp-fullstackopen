const Person = ({ person, onDeleteClick }) => {
  return (
    <div>
      {person.name} {person.number} {'  '}
      <button onClick={onDeleteClick}>delete</button>
    </div>
  );
};

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} onDeleteClick={() => onDelete(person.id)}/>
      ))}
    </div>
  );
};

export default Persons;
