const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/",(req, res) => {
  res.render("listings");
<<<<<<< HEAD
})
  router.post("/favourites", (req, res) => {
      db.query()
  })
=======
  });
>>>>>>> master
return router;

}
