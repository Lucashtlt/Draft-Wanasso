const mongoose = require('mongoose');

const partnerSchema = mongoose.Schema ({
    _id: {type: String, required: true},
    name: {type: String, required: true}, 
    logo: {type: String, required: true},
    events: [{type: mongoose.Schema.Types.ObjectId, ref: "Event"}]
})

module.exports = mongoose.model('Partner', partnerSchema);
