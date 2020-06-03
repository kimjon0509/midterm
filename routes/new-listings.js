const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/",(req, res) => {
    console.log("success")
})
  router.post("/", (req, res) => {
    console.log("posted");
  })
return router;
}
