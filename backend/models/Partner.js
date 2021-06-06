const mongoose = require('mongoose');

const partnerSchema = mongoose.Schema ({
    name: {type: String, required: true}, 
    logo: {type: String, required: true},
    events: [{type: mongoose.Schema.Types.ObjectId, ref: "Event", default: []}]
})

module.exports = mongoose.model('Partner', partnerSchema);
