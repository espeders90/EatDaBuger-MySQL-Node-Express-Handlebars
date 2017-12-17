var express = require("express");

var burger = require("../models/burgers.js");

var router = express.Router();
//Create Router

router.get("/", function(req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
    burger.all(function(data) {

        var hbsObject = { burgers: data };
        res.render("index", hbsObject);
    });
});

router.post("/burgers/create", function(req, res) {
    console.log(req.body.burger_name, "= your burger");
    burger.create("burger_name", req.body.burger_name, function() {
        res.redirect("/burgers");
    });
});

router.put("/burgers/update/:id", function(req, res) {

    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.update({ devoured: req.body.devoured }, condition, function() {
        res.redirect("/burgers");
    });
});
module.exports = router;


// var express = require("express");

// var router = express.Router();

// // Import the model (cat.js) to use its database functions.
// var cat = require("../models/cat.js");

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   cat.all(function(data) {
//     var hbsObject = {
//       cats: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

// router.post("/api/cats", function(req, res) {
//   cat.create([
//     "name", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   cat.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// // Export routes for server.js to use.
// module.exports = router;