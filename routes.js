const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  console.log("here");
  res.render("home");
});

router.get("/app", (req, res) => {
  res.render("app");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.post("/submit", (req, res) => {
  console.log("submit");
  console.log(req.body);
  console.log(req.body);
  data = req.body.data;
  const Key = process.env.Key;
  const ID = process.env.ID;

  if (data.name == "") return;
  let url = `https://api.edamam.com/search?q=${data.name}&app_id=${ID}&app_key=${Key}`;
  if (data.rangeFrom && data.rangeTo)
    url += `&from=${data.rangeFrom}&to=${data.rangeTo}`;
  if (data.cuisine) url += `&cuisineType=${data.cuisine}`;
  if (data.meal) url += `&mealType=${data.meal}`;
  if (data.dish) url += `&dishType=${data.dish}`;
  if (data.calFrom && data.calTo)
    url += `&calories=${data.calFrom}-${data.calTo}`;
  if (data.prepFrom && data.prepTo)
    url += `&time=${data.prepFrom}-${data.prepTo}`;

  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      res.json({ data: response });
    });
});

router.get("/recipe/:id", (req, res) => {
  const id = req.params.id;
  const r = `http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23${id}`;
  const ID = process.env.ID;
  const Key = process.env.Key;
  const url = `https://api.edamam.com/search?r=${r}&app_id=${ID}&app_key=${Key}`;

  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      res.render("recipe", { data: response[0] });
    });
});

module.exports = router;
