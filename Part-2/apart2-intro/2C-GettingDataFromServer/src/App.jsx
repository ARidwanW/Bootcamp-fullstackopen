import { useEffect, useState } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
  //!removing props
  //{notes}
  // const { notes } = props;
  const [notes, setNotes] = useState([]); // props.notes
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  // useEffect(() => {
  //   console.log("effect");
  //   axios
  //     .get("http://localhost:3001/notes")
  //     .then((response) => {
  //       console.log("promise fulfilled");
  //       setNotes(response.data);
  //     });
  // }, []);
  // console.log('render', notes.length, 'notes');

  const hook = () => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data);
      });
  }

  useEffect(hook, []) //?? run every completed render, but you can choose to fire it only when certain values have changed.
  

  const addNote = (event) => {
    event.preventDefault();
    // console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important); // note.important === true

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow?.map((note) => (
          <Note key={note.id} note={note} />
        ))}

        {/* {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))} */}

        {/* //! if using destructuring props */}
        {/* {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))} */}

        {/*//! Array Indexes as Keys NOT RECOMMENDED*/}
        {/* {notes.map((note, i) => (
          <li key={i}>{note.content}</li>
        ))} */}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
