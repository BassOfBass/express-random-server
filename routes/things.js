import express from 'express';
import Person from "../models/Person.js";

const router = express.Router();
const Users = [];

router.use("/", (req, res, next) => {
  console.log(`A request for things received at + ${Date.now()}`);
  next();
});

router.get('/', (req, res, next) => {
  res.render("things");
});

router.get("/clear-cookie", (req, res) => {
  res.clearCookie('name');
  res.send('cookie foo cleared');
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

router.get("/signup", (req, res) => {
  res.render("things/signup");
});

router.post("/signup", (req, res) => {

  if (!req.body.id || !req.body.password) {
    res.status("400");
    res.send("Invalid details!");
  } else {
    Users.filter((user) => {

      if (user.id === req.body.id) {
        res.render("things/signup", {
          title: "Signup",
          message: "User Already Exists! Login or choose another user id"
        });
      }

    });

    const newUser = { id: req.body.id, password: req.body.password };
    
    Users.push(newUser);
    req.session.user = newUser;
    res.redirect("/protected-page");
  }
});

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function checkSignIn(req, res, next) {

  if (req.session.user) {
    next(); // If session exists, proceed to page
  } else {
    let err = new Error("Not logged in!");
    next(err); // Error, trying to access unauthorized page!
  }

}

router.get("/protected-page", checkSignIn, (req, res) => {
  res.render("things/protected-page", { title: "Protected page", id: req.session.id });
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
  Person.findByIdAndUpdate(req.params.id, req.body, (err, response) => {

    if (err) {
      res.json({ message: `Error in updating person with id ${req.params.id}` });
    }

    res.json(response);

  });
});

router.delete("/people/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id, (err, response) => {

    if (err) {
      res.json({ message: `Error in deleting record id ${req.params.id}` });
    } else {
      res.json({message: `Person with id ${req.params.id} removed.`})
    }

  });
});

router.get("/:id([0-9]{5})", (req, res) => {
  res.send(`The id you specified is ${req.params.id}`);
});

router.get("/:name/:id", (req, res) => {
  res.send(`id: ${req.params.id} and name: ${req.params.name}`);
});

export default router;