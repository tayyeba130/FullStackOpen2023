export const Button = ({ children, clickHandler }) => {
	return <button onClick={clickHandler}>{children}</button>;
};
