const { Router } = require('express');
let appointments = require('../Data/appointments')
const Appointment = require('../Models/appointment')
const fs = require('fs')

module.exports = Router()
  .get('/:id/:date', (req, res, next) => {
    let filtered = appointments.filter(obj => obj.id == req.params.id);
    let sameDay = filtered.filter(obj => obj.date == req.params.date)
    res.json(sameDay)
  })
  // .post('/', (req, res, next) => {
  //   Appointment
  //     .create(req.body)
  //     .then(creature => res.send(creature))
  //     .catch(next);
  // })
  .post('/:id', (req, res, next) => {
    if((req.body.time).split(':')[1] === '00' || 
    (req.body.time).split(':')[1] === '15' || 
    (req.body.time).split(':')[1] === '30' || 
    (req.body.time).split(':')[1] === '45'){ 
      
      let count = 0;
      for(let i=0; i<appointments.length; i++){
        if(appointments[i].time == req.body.time && appointments[i].doctorId == req.params.id) {
          count++
        }
      }
      if(count <= 3){
        appointments.push(req.body)
        Appointment
        .create(req.body)
        .then(app => res.send(app))
        .catch(next);
        return res.status(200).send('you have been scheduled')
      } else {
        return res.status(400).send('doctor is over booked')
      }
    } else {
      return res.status(400).send('incorrect scheduled time, must be at 15 minute intervals')
    }
  })
  .delete('/:id', (req, res, next) => {
    Appointment
      .findByIdAndDelete(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });
//   .delete('/:id', (req, res, next) => {
//       let remaining = []
//       for(let i=0; i<appointments.length; i++){
//         if(appointments[i].id != req.params.id){
//           remaining.push(appointments[i])

//         }
//       }
//       appointments = remaining
//       res.json(remaining)
// });
