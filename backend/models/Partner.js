const mongoose = require('mongoose');

const partnerSchema = mongoose.Schema ({
    name: {type: String, required: true}, 
    logo:  [{type: mongoose.Schema.Types.ObjectId, ref: "File"}],
    events: [{type: mongoose.Schema.Types.ObjectId, ref: "Event"}]
})

module.exports = mongoose.model('Partner', partnerSchema);
