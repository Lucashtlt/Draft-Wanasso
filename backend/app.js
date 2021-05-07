const express = require('express');
const app = express();
const eventRoutes = require('./routes/eventRoutes');
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
process.env.TZ = 'Europe/Paris' 
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lucas:5&Lements@cluster0.ma2ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/api/events', eventRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;