import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    // const existPerson = persons.filter(person => person.name === newName)
    // const existPerson = persons.some(person => person.name === newName)
    const existPerson = persons.some((person) =>
      Object.entries(personObject).every(
        ([key, value]) => person[key] === value
      )
    );

    // console.log(existPerson.length);
    console.log(existPerson);

    // existPerson.legth === 0
    if (!existPerson) {
      // persons.concat(personObject)
      setPersons([...persons, personObject]);
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setFilteredName(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filteredName.toLowerCase())
  );

  //   return (
  //     <div>
  //       <h2>Phonebook</h2>
  //       <div>
  //         filter shown with{" "}
  //         <input
  //           type="text"
  //           value={filteredName}
  //           onChange={handleNameFilterChange}
  //         />
  //       </div>
  //       <h2>Add a new</h2>
  //       <form onSubmit={addPerson}>
  //         <div>
  //           name:{" "}
  //           <input
  //             required
  //             type="text"
  //             placeholder="input new name"
  //             value={newName}
  //             onChange={handleNameChange}
  //           />
  //         </div>
  //         <div>
  //           number:{" "}
  //           <input
  //             required
  //             type="text"
  //             placeholder="input new phone number"
  //             value={newNumber}
  //             onChange={handleNumberChange}
  //           />
  //         </div>
  //         <div>
  //           <button type="submit">add</button>
  //         </div>
  //       </form>
  //       <h2>Numbers</h2>
  //       {/* <div>
  //         {persons.map((person) => (
  //           <div key={person.name}>
  //             {person.name} {person.number}
  //           </div>
  //         ))}
  //       </div> */}
  //       <div>
  //         {filteredPersons.map((person) => (
  //           <div key={person.name}>
  //             {person.name} {person.number}
  //           </div>
  //         ))}
  //       </div>
  //       {/* <div>debug: {newName}</div> */}
  //     </div>
  //   );
  // };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        text={"filter shown with"}
        value={filteredName}
        onChange={handleNameFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        numberValue={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons}/>
    </div>
  );
};

export default App;
