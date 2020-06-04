const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log(req.query)
   let {product_id, user_id} = req.query
   console.log(product_id, 'product_id', user_id, 'user_id')
    db.query(`
      SELECT exists (
        SELECT true
        FROM favourites
        WHERE user_id = ${user_id}
        AND product_id = ${product_id});
    `)
    .then(data => {
      console.log(data.rows)
      res.send(data.rows);
    })
  })
  router.post('/del', (req, res) => {
    let {product_id, user_id} = req.query
    db.query(`
    DELETE FROM favourites
    WHERE user_id = ${user_id}
    AND product_id = ${product_id}
    `)
    .then(() => {
      console.log('deleted')
      res.status(201).send()
    })
  })

  router.post('/add', (req, res) => {
    let {product_id, user_id} = req.query
    db.query(`
    INSERT INTO favourites (user_id, product_id)
    VALUES (${user_id}, ${product_id})
    `)
    .then(() => {
      console.log('added')
      res.status(201).send()
    })
  })

  router.get("/:id",(req, res) => {
  res.render("favourites");
  })
return router;
}
