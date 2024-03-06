// import the built-in web server module
// node uses commonJS module system
const http = require("http");

let notes = [
	{
		id: 1,
		content: "HTML is easy",
		important: true,
	},
	{
		id: 2,
		content: "Browser can execute only JavaScript",
		important: false,
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true,
	},
];

// the event handler is called every time a request is made to the server
const app = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify(notes));
});

const port = 3001;
app.listen(port);

console.log(`Server running on port ${port}`);
