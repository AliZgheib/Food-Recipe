const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const router = require("./routes");

//setting up env file
const result = dotenv.config();

//setting up app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//setting up express handlebars
let hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    roundNumber: function (number) {
      const data = Number(number.toFixed(1));
      if (data == 0) return "N/A";
      return data;
    },
    roundNumber2: function (number) {
      const data = Number(number.toFixed(1));
      if (data == 0) return "N/A";
      return data + " %";
    },
    roundNumber3: function (number) {
      const data = Number(number.toFixed(1));
      if (data == 0) return "N/A";
      return data + " min";
    },
  },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use("/", router);

//setting public folder
app.use(express.static("public"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  if (result.error) {
    throw result.error;
  }
  console.log("App running on port " + PORT);
});
