// index.js
// where your node app starts
require("dotenv").config();
// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  const UTCDate = new Date().toUTCString();
  const unixTimestamp = Math.floor(new Date(UTCDate).getTime());
  res.status(200).json({ unix: unixTimestamp, utc: UTCDate });
});

// your first API endpoint...
app.get("/api/:time", function (req, res) {
  const { time } = req.params;
  let UTCDate;

  if (isNaN(Number(time))) {
    if (isNaN(Number(time.slice(0, 4)))) {
      return res.status(400).json({ error: "Invalid Date" });
    } else {
      UTCDate = new Date(time)
      UTCDate = UTCDate.toUTCString();
    }
  }

  let unixTimestamp;

  if (UTCDate) {
    unixTimestamp = Math.floor(new Date(time).getTime());
  } else {
    unixTimestamp = Number(time);
    UTCDate = new Date(unixTimestamp).toUTCString();
  }

  res.status(200).json({ unix: unixTimestamp, utc: UTCDate });
});

// listen for requests :)
app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});
