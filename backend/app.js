const express = require('express');
const app = express();
const eventRoutes = require('./routes/eventRoutes');
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const path = require('path');
process.env.TZ = 'Europe/Paris' 
const userRoutes = require('./routes/user');
const partnerRoutes = require('./routes/partnerRoutes')

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lucas:5&Lements@cluster0.ma2ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/events', eventRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/partners', partnerRoutes);

module.exports = app;