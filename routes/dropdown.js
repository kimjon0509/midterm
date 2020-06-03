const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/:category', (req, res) => {
    const category = req.params.category;
    console.log(typeof category);
    db.query(`
    SELECT *
    FROM products
    WHERE category = $1`, [category])
    .then(data => {
      console.log(data.rows)
      res.send(data.rows);
    })
  })
return router;
}
