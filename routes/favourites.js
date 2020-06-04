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
    db.query(`
    SELECT products.id as product_id, products.main_photo as main_photo, products.description, products.price, products.condition, users.name as user_name
    FROM favourites
    JOIN products ON product_id = products.id
    JOIN users ON seller_id = users.id
    WHERE user_id = $1`, [req.params.id])
    .then(data => {
      console.log(data.rows)
      res.send(data.rows)
    })
  })
return router;
}
