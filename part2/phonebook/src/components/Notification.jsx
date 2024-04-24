import { useEffect } from "react";
export const Notification = ({ content, type, hide }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			hide();
		}, 5000); // Remove after 5 seconds

		return () => clearTimeout(timer); // Clean up the timer
	}, [hide]);

	if (content === null) {
		return null;
	}
	return <div className={`notification ${type}`}>{content}</div>;
};
