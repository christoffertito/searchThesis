const mongoose = require('mongoose');

const Thesis = mongoose.model('Thesis', {
    title: { type: String },
    author: { type: String },
    course: { type: String },
    type: { type: String }
});

module.exports = { Thesis };