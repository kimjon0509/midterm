const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // need to check if users are registered
  //need to save locations to the database first then save user info to the database

  router.post("/register-page ",(req, res) => {
    let {name, profile_photo, email, password, phone_number, location_id} = req.body
    const queryString = `
    INSERT INTO users (name, profile_photo, email, password, phone_number, location_id)
    VALUES ($1, $2, $3, $4, $5, $6)`;
    const queryParams = [name, profile_photo, email, password, phone_number, location_id];

    db.query(queryString, queryParams)
      .then((res) => {
        res.status(201).send();
      })
})
return router;
}
