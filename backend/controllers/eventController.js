const { v4: uuidv4 } = require('uuid');
const Event = require('../models/Event');
const fs = require('fs');



exports.deleteEvent = (req, res, next) => {
  Event.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
}

exports.createEvent = (req, res, next) => {
  console.log(req.body.event)
  const eventObject = req.body.event;
  const event = new Event({
    _id: uuidv4(),
    ...eventObject,
  });
  event.save()
    .then(() => res.status(201).json(event))
    .catch(error => res.status(400).json({ error }));
}

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