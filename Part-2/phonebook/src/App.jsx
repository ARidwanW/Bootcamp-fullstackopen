import { useEffect, useState } from "react";
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

    const isPersonExist = persons.some((person) => person.name === newName);
    const existPerson = persons.find((p) => p.name === newName);

    if (!isPersonExist) {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");

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
      personService
        .update(existPerson.id, personObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== existPerson.id ? p : returnedPerson))
          );

          setNewName("");
          setNewNumber("");

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

    if (window.confirm(`Are you sure want to delete ${person.name}?`)) {
      personService
        .deleteId(id)
        .then((deletedPerson) => {
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
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filteredName.toLowerCase())
  );

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
