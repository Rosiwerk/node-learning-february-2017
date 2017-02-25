const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile("server.log", log + "\n", (err) => {
		if (err) {
			console.log("Unable to append to server log");
		}
	});
	next();
});

/* If maintenance */
/* ------------------*/

// app.use((req, res, next) => {
// 	res.render("maintenance.hbs", {
// 		pageTitle: "Under maintenance",
// 		theh1: "Maintenance (exclamation mark)",
// 		mainText: "Currently under maintenance, but that's not how we get down."
// 	});
// });

/* ------------------*/

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
	return text.toUpperCase();
});

app.get("/", (req, res) => {
	res.render("home.hbs", {
		pageTitle: "Home page baby",
		theh1: "Home (questionmark)",
		mainText: "Hopefully you will find the information you need in here baby."
	});
});

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About page baby",
		theh1: "About (questionmark)"
	});
});

app.get("/projects", (req, res) => {
	res.render("projects.hbs", {
		pageTitle: "My projects",
		theh1: "My other projects"
	});
});

app.get("/bad", (req, res) => {
	res.send({
		error: "Unable to complete your request, RIP baby."
	})
});

app.listen(port, () => {
	console.log(`Server is up on port ${port} baby.`);
});