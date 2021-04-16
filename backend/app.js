const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

const events = [
  {
    _id: '1',
    title: 'Mon premier Evenement',
    description: 'Evenement de fou',
    image: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    startDate: new Date('September 22, 2018 15:00:00'),
    endDate: new Date('September 22, 2018 16:00:00'),
  },
  {
    _id: '2',
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
  
  let index = events.findIndex(event => event._id == req.params.id);
  events.splice(index,1);
  res.status(200).json({ message: 'Objet supprimé !'});

});


module.exports = app;