const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/",(req, res) => {
  res.render("listings");
})
  router.post("/favourites", (req, res) => {
      db.query()
  })
return router;

}
