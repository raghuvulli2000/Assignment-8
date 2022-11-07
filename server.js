import axios, * as others from "axios";
import express from "express";
import path from "path";
import cors from "cors";

import { fileURLToPath } from "url";

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "/dist/angular-project");

app.use(express.static(publicPath));
// app.use(function (req, res, next) {
//   console.log("Headers Added");
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/angular-project/index.html"));
});

app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/angular-project/index.html"));
});

const config = {
  headers: {
    Authorization: `Bearer 1Qfvd-mBsP9XSvBJ8L3aAHDRYxp2owcYjtvu8JgvxI3mM_Jf7iukKAWwHt-0vfNkCFUV7CGKk2y_izbfNIIoI-j16ej7SR7efBnig2XMczkSCijr3jerfbXMKlw3Y3Yx`,
  },
};

app.get("/route", function (request, response) {
  var latitude = request.query.latitude;
  var longitude = request.query.longitude;
  var radius = request.query.radius;
  var category = request.query.category;
  var term = request.query.term;
  console.log(latitude, longitude, radius, category, term);
  var url =
    "https://api.yelp.com/v3/businesses/search?term=" +
    term +
    "&radius=" +
    radius +
    "&categories=" +
    category +
    "&latitude=" +
    latitude +
    "&longitude=" +
    longitude;
  console.log(url);
  var data;
  axios(url, config).then((resp) => {
    //  console.log(resp.data);
    response.end(JSON.stringify(resp.data));
  });
});

app.get("/businessid", function (request, response) {
  console.log("In detail route");
  var Id = request.query.id;
  console.log(Id);
  const url = "https://api.yelp.com/v3/businesses/" + Id;
  console.log(url);

  axios(url, config).then((resp) => {
    // console.log(resp.data);
    response.end(JSON.stringify(resp.data));
  });
});

app.get("/geoloc", function (request, response) {
  console.log("In detail route");
  var loc = request.query.loc;
  // console.log(Id);
  var url =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    loc +
    "&key=AIzaSyAhACUFKciRtELjw59DxRj6NKjg2P-kfH0";
  console.log(url);

  axios(url, config)
    .then((resp) => {
      // console.log(resp.data);
      response.end(JSON.stringify(resp.data));
    })
    .catch(function (error) {
      response.end('{"geometry":{"location":{"lat":-1,"lng":-1}}}');
    });
});

app.get("/options", function (request, response) {
  console.log("In autocomplete");
  var Id = request.query.id;
  console.log(Id);
  const url = "https://api.yelp.com/v3/autocomplete?text=" + Id;
  console.log(url);

  axios(url, config)
    .then((resp) => {
      // console.log(resp.data);
      response.end(JSON.stringify(resp.data));
    })
    .catch(function (error) {
      response.end();
    });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
