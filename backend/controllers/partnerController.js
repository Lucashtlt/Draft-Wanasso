
const Partner = require('../models/Partner');
const Event = require('../models/Event');

exports.deletePartner = (req, res, next) => {
  let partnerId = req.params.id
  Partner.findOne({ _id: partnerId })
    .then((partner) => {
      let eventsId = partner.events

      //On gère les partnersId dans les events lié à ce partner
      for (let eventId of eventsId) {
        Event.findOne({ _id: eventId }).then((obj) => {

          //Si l'événement n'a que ce partenaire il est supprimé
          if (obj.partners.length == 1) {
            Event.deleteOne({ _id: eventId }).then(() => {
              Partner.deleteOne({ _id: partnerId })
                .then(() =>
                  res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }))
            })
          }

          //Si l'événement a plusieurs partenaires, one enlève ce partenaire
          else {
            let index = obj.partners.findIndex(_id => _id == partnerId)
            obj.partners.splice(index, 1)
            Event.findOneAndUpdate({ _id: obj._id }, obj, { new: true })
              .then(() => Partner.deleteOne({ _id: partnerId })
                .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error })))
          }
        })
      }
    })
}


exports.createPartner = (req, res, next) => {
  console.log(req.body.partner)
  const partnerObject = req.body.partner;
  Partner.create(new Partner({
    ...partnerObject,
  }))
    .then((partner) => {
      partner.events.forEach(eventId => {

        Event.findById(eventId)
          .then(
            e => {
              console.log(e);
              e.partners.push(partner._id);
              Event.findOneAndUpdate({ _id: e._id }, { partners: e.partners }, { new: true });
            }
          );
      });

      res.status(201).json(partner);
    })
    .catch(error => res.status(400).json({ error }));
}

exports.getAllPartners = (req, res, next) => {
  Partner.find()
    .then(partners => res.status(200).json(partners))
    .catch(error => res.status(400).json({ error }));
}

exports.getOnePartner = (req, res, next) => {
  Partner.findOne({ _id: req.params.id })
    .then(partner => res.status(200).json(partner))
    .catch(error => res.status(400).json({ error }));
}
