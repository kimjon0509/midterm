const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // need to check if users are registered
  //need to save locations to the database first then save user info to the database
  router.post("/",(req, res) => {
    let {name, email, password, phone_number} = req.body
    const queryString = `
    INSERT INTO users (name, email, password, phone_number)
    VALUES ($1, $2, $3, $4)`;
    const queryParams = [name, email, password, phone_number];
    db.query(queryString, queryParams)
      .then((data) => {
        res.status(201).send();
      })
  })

  router.get('/', (req, res) => {
    console.log('getting data')
    let {email} = req.query
    console.log(email)
    db.query(`
    SELECT exists (
      SELECT true
      FROM users
      WHERE email = $1);
    `, [email])
    .then((data) => {
      console.log(data.rows, '123')
      res.send(data.rows)
    })
  })
return router;
}
