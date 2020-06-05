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
    // if (("condition" in req.query) && ("price" in req.query)) {
      for (let query in req.query) {
        if (query !== "condition" && query !== "price") {
          if (i === 1) {
            queryString += `
            WHERE (name LIKE $${i}
            OR description LIKE $${i}
            OR category LIKE $${i})`
          } else {
            queryString += `
            OR (name LIKE $${i}
            OR description LIKE $${i}
            OR category LIKE $${i})`
          }
          i++;
          queryParams.push(`%${req.query[query]}%`);
        }
        if (query === "condition") {
          if (i === 1) {
            queryString += `
            WHERE condition = $${i}`
          } else {
            queryString += `
            AND condition = $${i}`
          }
          i++;
          queryParams.push(`${req.query[query]}`);
        }
        if (query === 'price') {
          if (req.query[query] === 'high-low') {
            queryString += ` ORDER BY price DESC`
          } else if (req.query[query] === 'low-high') {
            queryString += ` ORDER BY price`;
          }
        }
      }
    // } else {
    //   for (let query in req.query) {
    //     if (i === 1) {
    //       queryString += `
    //       WHERE name LIKE $${i}
    //       OR description LIKE $${i}
    //       OR category LIKE $${i} `
    //     } else {
    //       queryString += `
    //       OR name LIKE $${i}
    //       OR description LIKE $${i}
    //       OR category LIKE $${i}`
    //     }
    //     i++;
    //     queryParams.push(`%${req.query[query]}%`);
    //   }
      console.log(queryString, queryParams)

      db.query(queryString, queryParams)
      .then(data => {
        console.log(data.rows)
        res.send(data.rows);
      })
    // }
  })
  return router;
};
