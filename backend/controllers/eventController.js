const { v4: uuidv4 } = require('uuid');
const Event = require('../models/Event');
const fs = require('fs');
const Partner = require('../models/Partner');



exports.deleteEvent = (req, res, next) => {
  Event.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
}

exports.createEvent = (req, res, next) => {
  const eventObject = req.body.event;
  const partnerList = eventObject.partners
  Event.create(new Event({
    ...eventObject
  }))
    .then((event) => {
      console.log(event.partners);
      event.partners.forEach(partnerId => {
  
        Partner.findById(partnerId)
        .then(
          p => {console.log(p);
            p.events.push(event._id);
            Partner.findOneAndUpdate({_id : p._id}, {events : p.events}, {new: true} );        }
          );
      }); 

      res.status(201).json(event);
    })
    .catch(error => res.status(400).json({ error }));
}



// exports.createEvent = (req, res, next) => {
//   console.log(req.body.event)
//   const eventObject = req.body.event;
//   const event = new Event({
//     ...eventObject,
//   });
//   console.log("event", event)
//   event.save()
//     .then(() => res.status(201).json(event))
//     .catch(error => res.status(400).json({ error }));
// }

exports.getAllEvents = (req, res, next) => {
  Event.find()
    .then(events => res.status(200).json(events))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneEvent = (req, res, next) => {
  Event.findOne({ _id: req.params.id })
    .then(event => res.status(200).json(event))
    .catch(error => res.status(400).json({ error }));
}