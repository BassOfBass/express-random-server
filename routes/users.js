import express from 'express';
import User from "../models/User.js";
import { returnAbsoluteHREFServer } from "../utils/absoluteURL.js";

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  // retrieves the list of all registered non-private profiles and sorts them by descending role and ascending name
  // admins will be able to see private profiles in this list too
  try {
    const userList = await User.find().sort({role: -1, name: 1});

    res.render("users", {
      title: "The list of users",
      users: userList
    });
  } catch (error) {
    console.log(error);
  }
  
});

// user signup page
router.get("/signup", async(req, res, next) => {

  try {
    res.render("users/signup", {
      title: "Account signup page",
      scriptHREF: returnAbsoluteHREFServer("/js/users/signup.js"),
      formHREF: returnAbsoluteHREFServer("/users/signup")
    });
  } catch (error) {
    console.log(error)
  }
  
});

// user signup credentials
// TODO: add validation, sanitaion and check for duplicates
router.post("/signup", async(req, res, next) => {
  
  try {
    /** @type User */
    const {name, email, password} = req.body;

    if (!String(name) || !String(email) || !String(password)) {
      throw new Error("All params must be strings")
    } else {
      const user = new User({
        name: name,
        email: email,
        password: password
      });

      user.save(() => {
        res.redirect("/userpage", { 
          title:"My personal page", 
          user: user 
        });
      });
    }

  } catch (error) {
    res.render("error", {
      message: error.message,
    })
  }

});

export default router;
