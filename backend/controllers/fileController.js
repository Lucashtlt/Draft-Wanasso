
const File = require('../models/File');

exports.createFile = (req, res, next) => {
    console.log('createFile');
    const fileObject = JSON.parse(req.body.file);
    const file = new File({
      ...fileObject,
      fileUrl: `/images/${req.file.filename}`
    });
    file.save()
      .then(() => res.status(201).json({ message: 'Fichier enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.getAllFiles = (req, res, next) => {
  File.find()
    .then(files => res.status(200).json(files))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneFile = (req, res, next) => {
  File.findOne({ _id: req.params.id })
    .then(file => res.status(200).json(file))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteFile = (req, res, next) => {
  let fileId = req.params.id
  File.deleteOne({ _id: fileId })
  .then(() => res.status(200).json({ message: 'Fichier supprimé !' }))
  .catch(error => res.status(400).json({ error }));
}
