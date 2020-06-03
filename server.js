// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const socketio = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = socketio(server)

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const favouritesRoutes = require("./routes/favourites");
const listingsRoutes = require("./routes/listings");
const newListingsRoutes = require("./routes/new-listings");
const registerPageRoutes = require("./routes/register-page");
const messagesRoutes = require("./routes/messages");
const productsRoutes =  require("./routes/products");
const searchRoutes = require("./routes/search");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/api/favourites", favouritesRoutes(db));
app.use("/api/listings", listingsRoutes(db));
app.use("/api/new-listings", newListingsRoutes(db));
app.use("/api/register", registerPageRoutes(db));

app.use("/api/messages", messagesRoutes(db, io));
app.use("/api/products", productsRoutes(db));
app.use("/api/search", searchRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
