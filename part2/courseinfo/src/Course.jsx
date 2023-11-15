const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Total = ({ sum }) => (
	<p>
		<strong>total of {sum} exercises</strong>
	</p>
);

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => (
	<>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</>
);

const Course = ({ course }) => {
	const { name, parts } = course;
	return (
		<>
			<Header courseName={name} />
			<Content parts={parts} />
			<Total sum={parts.reduce((acc, cur) => acc + cur.exercises, 0)} />
		</>
	);
};

export default Course;
