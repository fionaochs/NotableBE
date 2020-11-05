const { Router } = require('express');
const doctors = require('../Data/doctors')

module.exports = Router()
  .get('/', (req, res, next) => {
    res.json(doctors)
  });