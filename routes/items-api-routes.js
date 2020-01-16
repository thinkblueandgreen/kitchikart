// Requiring our models
var db = require("../models");

var categories = ["cookware", "misc", "small appliances"]
// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/items/:category", function(req, res) {
    
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.kitckenitems.findAll({
      where: req.params.category,
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/items", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    db.kitckenitems.findAll().then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/items/:name", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.kitckenitems.findOne({
      where: {
        name: req.params.name
      },
      
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.kitckenitems.create(req.body).then(function(dbkitckenitems) {
      res.json(dbkitckenitems);
    });
  });

  app.post('/api/createDummyData', (req,res)=>{
    for(let i = 0; i <10; i++){
      db.kitchenitems.create({category: categories[i%categories.length], productName:`Dummy${i}`, picurl:"www.google.com", productDescription: `Description${i}`, quantity: Math.floor(Math.random()*i*10 )}).then(data=>{console.log(data)})
    }
  })

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.kitckenitems.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbkitckenitems) {
      res.json(dbkitckenitems);
    });
  });

  // PUT route for updating posts
  app.put("/api/item", function(req, res) {
    db.kitckenitems.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbkitckenitems) {
      res.json(dbkitckenitems);
    });
  });


// Serve index.handlebars to the root route.
app.get("/", function(req, res) {
  console.log("/ root loaded");
  res.render("home");
});

// Serve index.handlebars to the root route.
app.get("/category/:catName", function(req, res) {
  console.log("/ root with parameter loaded");
  console.log( "category==>"+req.params.catName);
  db.kitchenitems.findAll({where:{category: req.params.catName}}).then(data=> {
    console.log("##### data from server: ", data[0].dataValues);    
    res.render("appliancescontent", {kitchenitems: data} );
  }).catch(err=>console.log(err))
  ;
});

app.get("/buy/:id", function(req, res) {
    console.log("buy functionality is been done");
    // reduce the content and database actions here. ...
    res.render("home");
});


};

