const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT || 5000;

app.listen(port, (err, _) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server connected to ${port}`);
  }
});
