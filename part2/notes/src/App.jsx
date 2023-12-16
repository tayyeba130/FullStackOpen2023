import { useEffect, useState } from "react";
import Note from "./components/Note";
import notesService from "./services/notes";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		notesService.getAll().then((notes) => {
			setNotes(notes);
		});
	}, []);

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
		};
		notesService.create(noteObject).then((note) => {
			setNotes(notes.concat(note));
			setNewNote("");
		});
	};

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const handleToggleImportance = (noteId) => {
		const note = notes.find((n) => n.id === noteId);
		const changedNote = { ...note, important: !note.important };
		notesService
			.update(noteId, changedNote)
			.then((noteR) => {
				setNotes(
					notes.map((note) => (note.id !== noteId ? note : noteR))
				);
			})
			.catch(() => {
				alert(
					`the note '${note.content}' was already deleted from server`
				);
				setNotes(notes.filter((n) => n.id !== noteId));
			});
	};

	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<div onClick={() => setShowAll(!showAll)}>
				<button>{showAll ? "important" : "all"}</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => handleToggleImportance(note.id)}
					/>
				))}
			</ul>
			<form onSubmit={(e) => addNote(e)}>
				<input
					value={newNote}
					onChange={handleNoteChange}
					placeholder="a new note..."
				/>
				<button type="submit">save</button>
			</form>
		</div>
	);
};

export default App;
