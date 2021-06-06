const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const Partner = require('../models/Partner');



exports.deletePartner = (req, res, next) => {
  Partner.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
}

exports.createPartner = (req, res, next) => {
    console.log(req.body.partner)
  const partnerObject = req.body.partner;
  const partner = new Partner({
    ...partnerObject,
  });
  partner.save()
    .then(() => res.status(201).json(partner))
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