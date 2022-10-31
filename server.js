const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

const publicPath = path.join(__dirname, "/dist/angular-project");

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/angular-project/index.html"));
});
//"./dist/angular-project"
app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
