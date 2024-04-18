import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { Error } from "./components/Error";
import personApi from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [values, setValues] = useState({ newName: "", newNumber: "" });
	const [filterText, setFilterText] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		personApi.getAll().then((data) => {
			setPersons(data);
		});
	}, []);

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const handleFilterChange = (event) => {
		setFilterText(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setError(null);
		if (values.newName === "" || values.newNumber === "") {
			return;
		}
		const newPersonObject = {
			name: values.newName,
			number: values.newNumber,
		};
		if (
			persons.some(
				(person) =>
					person.number === values.newNumber &&
					person.name === values.newName
			)
		) {
			alert(`${values.newNumber} is already added to phonebook`);
			return;
		}
		if (
			persons.some(
				(person) =>
					person.name === values.newName &&
					person.number !== values.newNumber
			)
		) {
			if (
				window.confirm(
					`${values.newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const personId = persons.find(
					(person) => person.name === values.newName
				).id;
				personApi
					.updatePersonNumber(personId, newPersonObject)
					.then((data) => {
						setPersons(
							persons.map((person) =>
								person.id !== personId ? person : data
							)
						);
						setValues({ newName: "", newNumber: "" });
					})
					.catch((error) => setError(error.response.data.error));
			}
		}
		personApi
			.create(newPersonObject)
			.then((data) => {
				setPersons(persons.concat(data));
				setValues({ newName: "", newNumber: "" });
			})
			.catch((error) => setError(error.response.data.error));
	};

	const deleteHandler = (id) => {
		const person = persons.find((person) => person.id === id);
		if (window.confirm(`Delete ${person.name}?`)) {
			personApi.remove(id);
			setPersons(persons.filter((person) => person.id !== id));
		}
	};

	return (
		<div className="container">
			<h2>Phonebook</h2>
			<Error content={error} />
			<Filter filterText={filterText} onChange={handleFilterChange} />
			<PersonForm
				values={values}
				handleChange={handleChange}
				onSubmit={handleSubmit}
			/>
			<h2>Numbers</h2>
			<Persons
				deleteHandler={deleteHandler}
				persons={persons.filter((person) =>
					person.name.toLowerCase().includes(filterText.toLowerCase())
				)}
			/>
		</div>
	);
};

export default App;
