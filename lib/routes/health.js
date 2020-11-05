const { Router } = require('express');

module.exports = Router()
  .get('/', (req, res, next) => {
    res.send('from API')
  });