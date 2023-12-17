import { useEffect, useState } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import notesService from "./services/notes";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

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
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				setNotes(notes.filter((n) => n.id !== noteId));
			});
	};

	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
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
