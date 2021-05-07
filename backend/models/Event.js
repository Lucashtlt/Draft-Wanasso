const mongoose = require('mongoose');

const eventSchema = mongoose.Schema ({
    _id: {type: String, required: true},
    title: {type: String, required: true}, 
    description: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true} ,
    image: {type: String, required: true} 
})

module.exports = mongoose.model('Thing', eventSchema);
