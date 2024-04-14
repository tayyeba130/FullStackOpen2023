const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
	Person.find().then((people) => {
		console.log("phonebook:");
		people.forEach((person) => {
			console.log(`${person.name} ${person.number}`);
		});
		mongoose.connection.close();
	});
}

if (process.argv.length === 5) {
	const name = process.argv[3];
	const number = process.argv[4];
	const person = new Person({
		name,
		number,
	});

	person.save().then((result) => {
		console.log(`added ${name} number ${number} to phonebook`);
		mongoose.connection.close();
	});
}
