const express = require("express");
const fs = require("fs");
const app = express();

app.get("/track", (req, res) => {
  const num = parseInt(req.query.num, 10) || null;
  const ts = parseInt(req.query.ts, 10); // timestamp (ms) that was embedded in the QR
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const loggedAt = new Date().toISOString();

  fs.appendFileSync(
    "logs.txt",
    `${loggedAt} - num=${num} - ts=${ts} - IP=${ip}\n`
  );
  console.log(
    "Logged visit:",
    `${loggedAt} - num=${num} - ts=${ts} - IP=${ip}`
  );

  const now = Date.now();
  // consider "within 30 seconds" as serverNow <= embeddedTs + 30000
  const within30s = !isNaN(ts) && now <= ts + 30000;

  const link1 = "https://google.com";
  const link2 = "https://youtube.com";

  const redirectURL = within30s ? link1 : link2;
  res.redirect(redirectURL);
});

app.listen(3000, () => {
  console.log("QR tracking server running on http://localhost:3000");
});
