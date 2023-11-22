// basic setup to serve index file & resources on https + http (for local)
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const dotenv = require("dotenv");

// load in .env config
dotenv.config();
const portHttp = process.env.PORT_HTTP || 8080;
const portHttps = process.env.PORT_HTTPS || 8443;

// load in creds
const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, "utf8");
const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, "utf8");
const credentials = { key: privateKey, cert: certificate };

// start making express app
const app = express();

// express config

// serve the static stuff
app.use(express.static("dist"));
app.use(express.static("public"));

// serve the index file
app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

// make & start the servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

console.log(`http server listening at http://localhost:${portHttp}`);
console.log(`https server listening at https://localhost:${portHttps}`);
