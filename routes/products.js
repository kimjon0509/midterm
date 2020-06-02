const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/:id', (req, res) => {
    db.query(`
    SELECT *
    FROM messages
    JOIN users ON users.id = seller_id
    WHERE messages.id = ${req.params.id}`)
    .then(data => res.json(data.rows))
  });

  return router;
};
