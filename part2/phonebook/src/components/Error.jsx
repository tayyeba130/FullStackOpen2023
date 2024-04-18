export const Error = ({ content }) => {
	if (content === null || content === "") {
		return null;
	}
	return (
		<div className="error">
			<p>{content}</p>
		</div>
	);
};
