import { StatisticLine } from "./StatisticLine";

export const Statistics = ({ good, neutral, bad }) => {
	const calculateAll = () => {
		return good + neutral + bad;
	};

	const calculateAverage = () => {
		return ((good - bad) / calculateAll()).toFixed(1);
	};

	const calculatePositive = () => {
		return `${((good / calculateAll()) * 100).toFixed(1)} %`;
	};

	if (calculateAll() === 0) {
		return (
			<>
				<h2>statistics</h2>
				<p>No feedback given</p>
			</>
		);
	}

	return (
		<>
			<h2>statistics</h2>
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={calculateAll()} />
					<StatisticLine text="average" value={calculateAverage()} />
					<StatisticLine
						text="positive"
						value={calculatePositive()}
					/>
				</tbody>
			</table>
		</>
	);
};
