const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log(req.query);
    const queryParams = [];
    let queryString = `
    SELECT *
    FROM products
    `
    let i = 1;
    for (let query in req.query) {
      if (i === 1) {
        queryString += `
        WHERE name LIKE $${i}
        OR description LIKE $${i}
        OR category LIKE $${i} `
      } else {
        queryString += `
        OR name LIKE $${i}
        OR description LIKE $${i}
        OR category LIKE $${i}`
      }
      i++;
      queryParams.push(`%${req.query[query]}%`);
    }
    console.log(queryString, queryParams)

    db.query(queryString, queryParams)
    .then(data => {
      res.send(data.rows);
    })
  })
  return router;
};
