const { v4: uuidv4 } = require('uuid');
const Event = require('../models/Event');


exports.deleteEvent = (req, res, next) => {
    Event.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  }


exports.createEvent = (req, res, next) => {

    const event = new Event({
      _id: uuidv4(),
      ...req.body
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