
const Event = require('../models/Event');

const Partner = require('../models/Partner');



exports.deleteEvent = (req, res, next) => {
  let eventId = req.params.id
  Event.findOne({ _id: eventId })
    .then((event) => {
      let partnersId = event.partners

      //On gère les eventsId dans les partners lié à cet event
      for (let partnerId of partnersId) {
        Partner.findOne({ _id: partnerId }).then((obj) => {
          console.log('obj', obj)
          let index = obj.events.findIndex(_id => _id == eventId)
          obj.events.splice(index,1)
          Partner.findOneAndUpdate({ _id: obj._id }, obj, { new: true })
            .then(() => {
              Event.deleteOne({ _id: eventId }).then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }));
            })
        })
      }

    })
}

exports.createEvent = (req, res, next) => {
  console.log("requête", req.body.event)
  const eventObject = req.body.event;
  Event.create(new Event({
    ...eventObject
  }))
    .then(
      (event) => {
        event.partners.forEach(partnerId => {
          Partner.findById(partnerId)
            .then(
              p => {
                console.log("partner", p);
                p.events.push(event._id);
                Partner.findOneAndUpdate({ _id: p._id }, { events: p.events }, { new: true }).then(() => {
                  console.log("partnerEvent", Event.findById(event._id).partners)
                }
                );
              }
            );
        });

        res.status(201).json(event);
      })
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