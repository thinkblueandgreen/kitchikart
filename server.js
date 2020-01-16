
// Requiring necessary npm packages
var exphbs = require("express-handlebars");
var express = require("express");
var mysql = require("mysql");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.engine("handlebars", exphbs({
  defaultLayout: "main" ,
  helpers: {
   toJSON : function(object) {
     return JSON.stringify(object);
   }
 }
 }));
app.set("view engine", "handlebars");


// Requiring our routes
require("./routes/items-api-routes.js")(app);
// require("./routes/items-api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
