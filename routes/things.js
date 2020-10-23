const express = require('express');
const router = express.Router();

const Person = require("../models/Person");

router.use("/", (req, res, next) => {
  console.log(`A request for things received at + ${Date.now()}`);
  next();
});

router.get('/', (req, res, next) => {
  res.render("things");
});

router.get("/first-template", (req, res) => {
  res.render('things/first-view');
});

router.get("/dynamic-view", (req, res) => {
  res.render("things/dynamic-view", {
    name: "TutorialsPoint", 
    url: "http://www.tutorialspoint.com"
  });
});

router.get("/login-view", (req, res, next) => {
  res.render("things/login-view", {
    user: {name: "Ayush", age: "20"}
  });
});

router.get("/components", (req, res, next) => {
  res.render("things/content");
});

router.get("/static-file-test", (req, res, next) => {
  res.render("things/static-file-test");
});

router.get("/form-tester", (req, res, next) => {
  res.render("things/form-tester");
});

router.post("/form-tester", (req, res, next) => {
  console.log({say: req.body.say, to: req.body.to});
  res.send("received your request!");
});

router.get("/person", (req, res) => {
  res.render("things/person");
});

router.post("/person", (req, res) => {
  const personInfo = req.body; // Get the parsed information

  if (!personInfo.name || !personInfo.age || !personInfo.nationality) {
    res.render("things/show-message", {
      message: "Sorry, you provided wrong info", 
      type: "error"
    });

  } else {
    const newPerson = new Person({
      name: personInfo.name,
      age: personInfo.age,
      nationality: personInfo.nationality
    }); 

    newPerson.save((err, Person) => {

      if (err) {
        res.render("things/show-message", {
          message: "Database error",
          type: "error"
        });
      } else {
        res.render("things/show-message", {
          message: "New person added",
          type: "success",
          person: personInfo
        });
      }
      
    });
  }
});

router.get("/people", (req, res) => {
  Person.find((err, response) => {
    res.json(response);
  });
});

router.put("/people/:id", (req, res) => {
  
});

router.get("/:id([0-9]{5})", (req, res) => {
  res.send(`The id you specified is ${req.params.id}`);
});

router.get("/:name/:id", (req, res) => {
  res.send(`id: ${req.params.id} and name: ${req.params.name}`);
});

module.exports = router;