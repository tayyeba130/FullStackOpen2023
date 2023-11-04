import { useState } from "react";
import { Statistics } from "./components/Statistics";
import { Button } from "./components/Button";

const App = () => {
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

	return (
		<div>
			<h1>give feedback</h1>

			<Button clickHandler={incrementGoodHandler}>good</Button>
			<Button clickHandler={incrementNeutralHandler}>neutral</Button>
			<Button clickHandler={incrementBadHandler}>bad</Button>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
