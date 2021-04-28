const express = require('express');
var cors = require('cors');
const app = express();
const { v4: uuidv4 } = require('uuid');
var bodyParser = require('body-parser');
process.env.TZ = 'Europe/Paris' 

app.use(cors());

app.use(bodyParser.json());

const events = [
  {
    _id: uuidv4(),
    title: 'Mon premier Evenement',
    description: 'Evenement de fou',
    image: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    startDate: new Date('September 22, 2018 15:00:00'),
    endDate: new Date('September 22, 2018 16:00:00'),
  },
  {
    _id: uuidv4(),
    title: 'Marche XR',
    description: 'Evenement de fou',
    image: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    startDate: new Date('September 22, 2018 15:00:00'),
    endDate: new Date('September 22, 2018 16:00:00'),
  },
];

app.get('/api/events', (req, res, next) => {
  res.status(200).json(events);
});

app.delete('/api/events/:id', (req, res, next) => {
  console.log(req.params.id)
  let index = events.findIndex(event => event._id == req.params.id);
  events.splice(index, 1);
  res.status(200).json( {id: req.params.id} );
});

app.post('/api/events', (req, res, next) => {
  var obj = {
    _id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    image: req.body.image
  }
  console.log(req.body);
  events.push(obj)
  res.status(200).json(
    obj
  );
  console.log(obj);
});

module.exports = app;