export const Persons = ({ persons, deleteHandler }) => {
	if (persons.length === 0) {
		return null;
	}
	return (
		<div>
			{persons.map((person) => {
				const { id, name, number } = person;
				return (
					<div key={id}>
						<span>
							{name} {number}
						</span>{" "}
						<button onClick={() => deleteHandler(id)}>
							delete
						</button>
					</div>
				);
			})}
		</div>
	);
};
