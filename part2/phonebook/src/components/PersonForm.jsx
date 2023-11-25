export const PersonForm = ({ onSubmit, values, handleChange }) => {
	return (
		<form onSubmit={onSubmit}>
			<div>
				name:{" "}
				<input
					name="newName"
					value={values.newName}
					onChange={handleChange}
				/>
			</div>
			<div>
				number:{" "}
				<input
					name="newNumber"
					value={values.newNumber}
					onChange={handleChange}
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};
