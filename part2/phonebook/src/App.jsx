import { useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [values, setValues] = useState({ newName: "", newNumber: "" });
	const [filterText, setFilterText] = useState("");

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const handleFilterChange = (event) => {
		setFilterText(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (values.newName === "" || values.newNumber === "") {
			return;
		}
		if (persons.some((person) => person.name === values.newName)) {
			alert(`${values.newName} is already added to phonebook`);
			return;
		}
		const newPersonObject = {
			name: values.newName,
			number: values.newNumber,
			id: persons.length + 1,
		};
		setPersons(persons.concat(newPersonObject));
		setValues({ newName: "", newNumber: "" });
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filterText={filterText} onChange={handleFilterChange} />
			<PersonForm
				values={values}
				handleChange={handleChange}
				onSubmit={handleSubmit}
			/>
			<h2>Numbers</h2>
			<Persons
				persons={persons.filter((person) =>
					person.name.toLowerCase().includes(filterText.toLowerCase())
				)}
			/>
		</div>
	);
};

export default App;
