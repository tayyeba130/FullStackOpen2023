const express = require("express");
const app = express();

app.use(express.json());

let notes = [
	{
		id: 1,
		content: "HTML is easy",
		important: true,
	},
	{
		id: 2,
		content: "Browser can execute only JavaScript",
		important: false,
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true,
	},
];

app.get("/", (req, res) => {
	res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
	res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
	const id = Number(req.params.id);
	const note = notes.find((note) => note.id === id);
	if (note) {
		res.json(note);
	} else {
		res.status(404).end();
	}
});

app.delete("/api/notes/:id", (req, res) => {
	const id = Number(req.params.id);
	notes = notes.filter((note) => note.id !== id);
	res.status(204).end();
});

app.post("/api/notes", (req, res) => {
	const body = req.body;

	if (!body.content) {
		return res.status(400).json({
			error: "content missing",
		});
	}

	const note = {
		content: body.content,
		important: Boolean(body.important) || false,
		// when the important property is false, then the body.important || false expression
		// will in fact return the false from the right-hand side
		id: generateID(),
	};

	notes = notes.concat(note);

	res.json(note);
});

const port = 3001;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
function generateID() {
	// The array is transformed into individual numbers by using the ... operator
	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
	return maxId + 1;
}
