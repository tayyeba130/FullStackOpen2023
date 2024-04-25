import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { Notification } from "./components/Notification";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personApi from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [values, setValues] = useState({ newName: "", newNumber: "" });
	const [filterText, setFilterText] = useState("");
	const [notification, setNotification] = useState(null);

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

	const updatePersonNumber = (personId, newPersonObject) => {
		personApi
			.updatePersonNumber(personId, newPersonObject)
			.then((data) => {
				setPersons(
					persons.map((person) =>
						person.id !== personId ? person : data
					)
				);
				setValues({ newName: "", newNumber: "" });
				setNotification({
					type: "success",
					content: `Updated ${data.name}`,
				});
			})
			.catch((error) => {
				console.log(error);
				setNotification({
					type: "error",
					content: `Information of ${newPersonObject.name} has already been removed from the server.`,
				});
			});
	};

	const createPerson = (newPersonObject) => {
		personApi
			.create(newPersonObject)
			.then((data) => {
				setPersons(persons.concat(data));
				setValues({ newName: "", newNumber: "" });
				setNotification({
					type: "success",
					content: `Added ${data.name}`,
				});
			})
			.catch((error) => {
				console.log(error);
				setNotification({
					type: "error",
					content: `There was a problem adding the person to the server.`,
				});
			});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setNotification(null);
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
				updatePersonNumber(personId, newPersonObject);
				return;
			} else {
				return;
			}
		}
		createPerson(newPersonObject);
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
			<Notification
				content={notification?.content || null}
				type={notification?.type || null}
				hide={() => setNotification(null)}
			/>
			{/* <Error content={error} /> */}
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