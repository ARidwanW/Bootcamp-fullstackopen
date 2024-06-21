import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from './services/notes'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("a new note...")
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const addNote = (event) => {
        event.preventDefault()

        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote("")
            })
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value)
    }

    const toogleImportanceOf = (id) => {
        console.log(`importance of ${id} needs to be toggled`);
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(n => n.id !== id ? n : returnedNote))
            })
            .catch(error => {
                alert(
                    `the note '${note.content}' was already deleted from server`
                )
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>
            <div>
                <ul>
                    {notesToShow?.map(note =>
                        <Note
                            key={note.id}
                            note={note}
                            toogleImportance={() => toogleImportanceOf(note.id)} />
                    )}
                </ul>
            </div>
            <div>
                <form onSubmit={addNote}>
                    <input value={newNote} onChange={handleNoteChange} />
                    <button type="submit">save</button>
                </form>
            </div>
        </div>
    )
}

export default App;