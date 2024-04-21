require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

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

app.get("/info", (_req, res) => {
	Person.find({}).then((people) => {
		const time = new Date();
		res.send(
			`<div>
                <p>Phonebook has info for ${people.length} people</p>
                <p>${time}</p>
            </div>`
		);
	});
});

app.get("/api/persons", (_req, res) => {
	Person.find({}).then((people) => {
		res.json(people);
	});
});

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
	Person.findByIdAndDelete(req.params.id)
		.then((_result) => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body;
	const person = {
		name: body.name,
		number: body.number,
	};
	Person.findByIdAndUpdate(req.params.id, person, {
		new: true,
		runValidators: true,
		context: "query",
	})
		.then((updatedPerson) => {
			res.json(updatedPerson);
		})
		.catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
	const body = req.body;

	// const nameExists = persons.find((person) => person.name === body.name);
	// if (nameExists) {
	// 	return res.status(403).json({ error: "name must be unique" });
	// }

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person
		.save()
		.then((savedPerson) => {
			res.json(savedPerson);
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, _req, res, next) => {
	console.error(error.message);
	console.log(error.message);
	if (error.name === "CastError") {
		return res.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
