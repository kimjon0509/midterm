const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/del', (req, res) => {
    let {product_id} = req.query
    db.query(`
    DELETE FROM products
    WHERE id = ${product_id}
    returning *`)
    .then(() => {
      console.log('deleted')
      res.status(201).send()
    })
  })

  router.get("/:id",(req, res) => {
    db.query(`
    SELECT products.id as product_id, products.main_photo as main_photo, products.description, products.price, products.condition, products.category
    FROM products
    JOIN users ON seller_id = users.id
    WHERE seller_id = $1`, [req.params.id])
    .then(data => {
      console.log(data.rows)
      res.send(data.rows)
    })
  })
return router;
}
