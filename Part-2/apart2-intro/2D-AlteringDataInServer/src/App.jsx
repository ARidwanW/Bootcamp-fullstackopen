import { useEffect, useState } from "react";
// import axios from 'axios'
import Note from "./components/Note";
import noteService from './services/notes'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("a new note...")
    const [showAll, setShowAll] = useState(true)

    //==================================================
    // const hook = () => {
    //     console.log('effect');
    //     axios
    //         .get('http://localhost:3001/notes')
    //         .then(response => {
    //             console.log('promise fulfilled');
    //             setNotes(response.data)
    //         })
    // }

    // useEffect(hook, [])
    //==================================================

    useEffect(() => {
        noteService
            .getAll()
            //==================================================
            // .then(response => {
            //     setNotes(response.data)
            // })
            //==================================================
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const addNote = (event) => {
        event.preventDefault()

        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            // id: `${notes.length + 1}`,
        }

        //==================================================
        // setNotes(notes.concat(noteObject))

        // axios
        //     .post('http://localhost:3001/notes', noteObject)
        //     .then(response => {
        //         console.log(response);
        //         setNotes(notes.concat(response.data))
        //         setNewNote("")
        //     })
        //==================================================

        noteService
            .create(noteObject)
            //==================================================
            // .then(response => {
            //     setNotes(notes.concat(response.data))
            //     setNewNote("")
            // })
            //==================================================
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
        // const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        //==================================================
        // axios.put(url, changedNote).then(response => {
        //     setNotes(notes.map(n => n.id !== id ? n : response.data))
        // })
        //==================================================

        noteService
            .update(id, changedNote)
            //==================================================
            // .then(response => {
            //     setNotes(notes.map(n => n.id !== id ? n : response.data))
            // })
            //==================================================
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