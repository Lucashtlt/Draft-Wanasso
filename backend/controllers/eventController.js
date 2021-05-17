const { v4: uuidv4 } = require('uuid');
const Event = require('../models/Event');
const fs = require('fs');


exports.deleteEvent = (req, res, next) => {
  Event.findOne({ _id: req.params.id })
    .then(event => {
      const filename = event.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Event.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      })
    })
}


exports.createEvent = (req, res, next) => {
  const eventObject = JSON.parse(req.body.event);
  delete eventObject._id;
  const event = new Event({
    _id: uuidv4(),
    ...eventObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  event.save()
    .then(() => res.status(201).json())
    .catch(error => res.status(400).json({ error }));
}

exports.getAllEvents = (req, res, next) => {
  Event.find()
    .then(events => res.status(200).json(events))
    .catch(error => res.status(400).json({ error }));
}