import express from 'express';
import User from "../models/User.js";

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {

  try {
    const userList = await User.find().sort()

    res.render("users", {
      title: "The list of users",
      users: userList
    });
  } catch (error) {
    
  }
  
});

export default router;
