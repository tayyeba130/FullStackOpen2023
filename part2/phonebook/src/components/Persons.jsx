export const Persons = ({ persons }) => {
	if (persons.length === 0) {
		return null;
	}
	return (
		<div>
			{persons.map((person) => (
				<p key={person.id}>{person.name}</p>
			))}
		</div>
	);
};
