const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Define a custom token to log request body
morgan.token("req-body", function (req) {
	return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
	morgan(function (tokens, req, res) {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, "content-length"),
			"-",
			tokens["response-time"](req, res),
			"ms",
			tokens["req-body"](req, res),
		].join(" ");
	})
);

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/info", (req, res) => {
	const time = new Date();
	res.send(
		`<div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${time}</p>
        </div>`
	);
});

app.get("/api/persons", (req, res) => {
	res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => person.id === id);
	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter((person) => person.id !== id);
	res.status(204).end();
});

app.post("/api/persons", (req, res) => {
	const body = req.body;
	if (!body.name) {
		return res.status(400).json({ error: "name is missing" });
	}
	if (!body.number) {
		return res.status(400).json({ error: "number is missing" });
	}

	const nameExists = persons.find((person) => person.name === body.name);
	if (nameExists) {
		return res.status(403).json({ error: "name must be unique" });
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);
	res.status(201).json(person);
});

const generateId = () => {
	const max = 1_000_000;
	const randomId = Math.floor(Math.random() * max) + 1;
	return randomId;
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
