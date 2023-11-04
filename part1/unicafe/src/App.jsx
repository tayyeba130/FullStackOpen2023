import { useState } from "react";

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const incrementGoodHandler = () => {
		setGood(good + 1);
	};

	const incrementNeutralHandler = () => {
		setNeutral(neutral + 1);
	};

	const incrementBadHandler = () => {
		setBad(bad + 1);
	};

	const calculateAll = () => {
		return good + neutral + bad;
	};

	const calculateAverage = () => {
		return (good - bad) / calculateAll();
	};

	const calculatePositive = () => {
		return (good / calculateAll()) * 100;
	};

	return (
		<div>
			<h1>give feedback</h1>

			<button onClick={incrementGoodHandler}>good</button>
			<button onClick={incrementNeutralHandler}>neutral</button>
			<button onClick={incrementBadHandler}>bad</button>

			<h2>statistics</h2>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {calculateAll()}</p>
			<p>average {calculateAverage()}</p>
			<p>positive {calculatePositive()} %</p>
		</div>
	);
};

export default App;
