const express = require('express');
const router = express.Router();

router.use("/", (req, res, next) => {
  console.log(`A request for things received at + ${Date.now()}`);
  next();
});

router.get('/', (req, res, next) => {
  res.send('Things');
});

router.post('/', (req, res) => {
  res.send('POST route on things.');
});

router.get("/first-template", (req, res) => {
  res.render('hw/first-view');
});

router.get("/:id([0-9]{5})", (req, res) => {
  res.send(`The id you specified is ${req.params.id}`);
});

router.get("/:name/:id", (req, res) => {
  res.send(`id: ${req.params.id} and name: ${req.params.name}`);
});

module.exports = router;