const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/",(req, res) => {
    console.log("success")
})
// need to get seller_id by cookie
  router.post("/", (req, res) => {
    let {name, condition, category, discription, mainImage, price, subImage1, subImage2, subImage3, subImage4} = req.body
    db.query(`
    INSERT INTO products (name, condition, category, description, main_photo, price, sub_photo1, sub_photo2, sub_photo3, sub_photo4,
    seller_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`, [name, condition, category, discription, mainImage, price, subImage1, subImage2, subImage3, subImage4, 1])
    .then((data) => {
      res.send(data.rows)
    })
    })
    return router;
}
