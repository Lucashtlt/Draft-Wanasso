const express = require('express');
const dotenv = require('dotenv');
const app = express();
const eventRoutes = require('./routes/eventRoutes');
var bodyParser = require('body-parser');

app.listen(process.env.port, () => {
})

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
limit: '150mb',
extended: true
})); 

dotenv.config();

const path = require('path');
process.env.TZ = 'Europe/Paris' 
const userRoutes = require('./routes/user');
const partnerRoutes = require('./routes/partnerRoutes')
const fileRoutes = require('./routes/fileRoutes')

const mongoose = require('mongoose');
const mongoUrl = process.env.mongourl;
console.log(mongoUrl);
mongoose.connect(mongoUrl,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.post('/images', express.static(path.join(__dirname.split(' ').join('%20'), '/images')));
app.get('/images/:filename', (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullfilepath = path.join(dirname, 'images/' + filename);
  return res.sendFile(fullfilepath);
});
app.use('/api/events', eventRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/files', fileRoutes)
module.exports = app;