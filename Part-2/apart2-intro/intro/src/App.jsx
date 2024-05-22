import Note from "./components/Note";

const App = ({ notes }) => {
  // const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}

        {/*//! Array Indexes as Keys NOT RECOMMENDED*/}
        {/* {notes.map((note, i) => (
          <li key={i}>{note.content}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default App;
