var exphbs = require("express-handlebars");
var express = require("express");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Rocket123$",
  database: "kitchenitems_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Serve index.handlebars to the root route.
app.get("/", function(req, res) {
    console.log("/ root loaded");
    res.render("index");
});

// Serve index.handlebars to the category click.
app.get("/category/:catName", function(req, res) {
  console.log( "category==>"+req.params.catName);
  connection.query("SELECT * FROM kitchenitems where category = ?", [req.params.catName], function(err, data) {
  //connection.query(query, function(err, data) {
    if (err) {
      console.log(err.sqlMessage);
      return res.status(500).end();
    }
    console.log(data);
    // res.json(data);
    res.render("items", { kitchenitems: data });
  });
});

// Serve index.handlebars to shop all button.
// app.get("/all", function(req, res) {
//   //var query = "SELECT * FROM kitchenitems;"
//   //console.log(query);
//   connection.query(query, function(err, data) {
//   //connection.query(query, function(err, data) {
//     if (err) {
//       return res.status(500).end();
//     }
//     console.log(data);
//     res.render("index", { kitchenitems: data });
//   });
// });


// Serve one procuct.
/*app.get("/:id", function(req, res) {
  connection.query("SELECT * FROM quotes where id = ?", [req.params.id], function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    console.log(data);
    res.render("Product", data[0]);
  });
});*/

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
})