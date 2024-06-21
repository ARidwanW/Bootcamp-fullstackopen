import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from './services/notes'
import Notification from "./components/Notification";

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Sience, Univeristy of Helsinki 2024</em>
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("a new note...")
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')

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
                console.log(error.message);
                // alert(
                //     `the note '${note.content}' was already deleted from server`
                // )
                setErrorMessage(
                    `the note '${note.content}' was already deleted from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000);
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
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
                    <li>This is not affected by note styles</li>
                </ul>
            </div>
            <div>
                <form onSubmit={addNote}>
                    <input value={newNote} onChange={handleNoteChange} />
                    <button type="submit">save</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default App;