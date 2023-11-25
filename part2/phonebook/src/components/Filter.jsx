export const Filter = ({ filterText, onChange }) => {
	return (
		<div>
			filter shown with <input value={filterText} onChange={onChange} />
		</div>
	);
};
