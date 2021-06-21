const mongoose = require('mongoose');

const fileSchema = mongoose.Schema ({
    creatingDate: {type: Date, required: true},
    title: {type: String, required: true}, 
    description: {type: String, required: true},
    fileUrl: {type: String, required: true},
})

module.exports = mongoose.model('File', fileSchema);
