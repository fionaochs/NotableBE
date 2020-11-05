const { Router } = require('express');
const appointments = require('../Data/appointments')
const Appointment = require('../Models/appointment')

module.exports = Router()
  // .get('/', (req, res, next) => {
  //   res.json(appointments)
  // })
  // .get('/:id', (req, res, next) => {
  //   let filtered = appointments.filter(obj => obj.id == req.params.id);
  //   res.json(filtered)
  // })
  .get('/:id/:date', (req, res, next) => {
    let filtered = appointments.filter(obj => obj.id == req.params.id);
    let sameDay = filtered.filter(obj => obj.date == req.params.date)
    res.json(sameDay)
  })
  .post('/', (req, res, next) => {
    if((req.body.time).slice(3,5) != '00' || 
    (req.body.time).slice(3,5) != '15' || 
    (req.body.time).slice(3,5) != '30' || 
    (req.body.time).slice(3,5) != '45'){ 
      return res.status(400).send('incorrect scheduled time, must be at 15 minute intervals')
    } else {
      Appointment
      .create(req.body)
      .then(appointment => res.send(appointment))
      .catch(next);
    }
  })
  .delete('/:id', (req, res, next) => {
      let remaining = appointments.forEach((obj, i) => {
        if(obj.id == req.params.id){
          appointments.splice(i, 1)
        }
      })
      res.json(remaining)
});
