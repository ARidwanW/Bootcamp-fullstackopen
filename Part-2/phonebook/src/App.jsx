import { useEffect, useState } from "react";
// import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifType, setNotifType] = useState("success");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    console.log("add person");

    const personObject = {
      name: newName,
      number: newNumber,
    };

    // const existPerson = persons.filter(person => person.name === newName)
    const isPersonExist = persons.some((person) => person.name === newName);
    const existPerson = persons.find((p) => p.name === newName);

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
    console.log("is person exist:", isPersonExist);
    console.log("exist person", existPerson);

    // existPerson.legth === 0
    if (!isPersonExist) {
      personService.create(personObject).then((returnedPerson) => {
        console.log("create person", returnedPerson);

        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");

        console.log("Notification: Person added successfully");

        setNotifType("success");
        setNotifMessage(`Added ${returnedPerson.name}`);

        setTimeout(() => {
          setNotifMessage(null);
        }, 5000);
      });
    } else if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      console.log("Updating new number for", existPerson);
      // alert(`${newName} is already added to phonebook`);
      // alert(`${personObject[existKey]} is already added to phonebook`);

      personService
        .update(existPerson.id, personObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== existPerson.id ? p : returnedPerson))
          );

          console.log("updated", returnedPerson);

          setNewName("");
          setNewNumber("");

          console.log("Notification: Number changed successfully");

          setNotifType("success");
          setNotifMessage(`Number for ${returnedPerson.name} changed`);

          setTimeout(() => {
            setNotifMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setNotifType("error");
          setNotifMessage(
            `Information of ${newName} has already been removed from server`
          );
          setPersons(persons.filter((p) => p.id !== existPerson.id));

          setTimeout(() => {
            setNotifMessage(null);
          }, 5000);
        });
    } else {
      console.log("Not changed");
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

  const handlePersonDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    console.log(`Deleting ${person.name} from phonebook`);

    if (window.confirm(`Are you sure want to delete ${person.name}?`)) {
      personService
        .deleteId(id)
        .then((deletedPerson) => {
          console.log("Deleted", deletedPerson);
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setNotifType("error");
          setNotifMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setPersons(persons.filter((p) => p.id !== id));
          setTimeout(() => {
            setNotifMessage(null);
          }, 5000);
        });
    } else {
      console.log(`Cancel to delete ${person.name}`);
    }
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
      <Notification type={notifType} message={notifMessage} />
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
      <Persons persons={filteredPersons} onDelete={handlePersonDelete} />
    </div>
  );
};

export default App;
