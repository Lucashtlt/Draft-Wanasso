const mongoose = require('mongoose');

const eventSchema = mongoose.Schema ({
    creatingDate: {type: Date, required: true},
    title: {type: String, required: true}, 
    description: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true} ,
    type: {type: String, required: true},
    up: {type: Boolean, required: true},
    location: {type: String, required: true},
    link: {type: String, required: true},
    image: [{type: mongoose.Schema.Types.ObjectId, ref: "File"}],
    partners: [{type: mongoose.Schema.Types.ObjectId, ref: "Partner"}]
})

module.exports = mongoose.model('Event', eventSchema);
