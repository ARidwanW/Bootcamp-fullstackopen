import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      console.log(response.data);
    });
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();
    console.log("add person");

    const personObject = {
      name: newName,
      number: newNumber,
    };

    // const existPerson = persons.filter(person => person.name === newName)
    const existPerson = persons.some(person => person.name === newName)
    
    //! for key-pairs exist
    // const existPerson = persons.some((person) =>
    //   Object.entries(personObject).every(
    //     ([key, value]) => person[key] === value
    //   )
    // );

    //! for existed value
    // let existKey = "";
    // const existPerson = persons.some((person) =>
    //   Object.entries(personObject).some(([key, value]) => {
    //     console.log(key, value, person, person[key]);
    //     if (person[key] === value) {
    //       existKey = key;
    //       return true;
    //     }
    //     return false;
    //   })
    // );

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
      // alert(`${personObject[existKey]} is already added to phonebook`);
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
