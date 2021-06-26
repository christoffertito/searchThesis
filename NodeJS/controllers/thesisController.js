const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { Thesis } = require('../models/thesis');

// Retrieving All Records
router.get('/', (req, res) => {
    Thesis.find((err, docs) => {
        if (!err) { res.send(docs) }
        else { console.log('Error in Retrieving Thesis: ' + JSON.stringify(err, undefined, 2)) }
    });
});

// Retrieving Records with ID
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Thesis.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc) }
        else { console.log('Error in Retrieving Thesis: ' + JSON.stringify(err, undefined, 2)); }
    });
});

// Add Record
router.post('/', (req, res) => {
    let ths = new Thesis({
        title: req.body.title,
        author: req.body.author,
        course: req.body.course,
        type: req.body.type
    });

    ths.save((err, doc) => {
        if (!err) { res.send(doc) }
        else { console.log('Error in Thesis Save: ' + JSON.stringify(err, undefined, 2)); }
    });
});

// Update Record
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    let ths = {
        title: req.body.title,
        author: req.body.author,
        course: req.body.course,
        type: req.body.type
    };

    Thesis.findByIdAndUpdate(req.params.id, { $set: ths }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Thesis Update: ' + JSON.stringify(err, undefined, 2)); }
    });
});

// Delete Record
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Thesis.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc) }
        else { console.log('Error in Thesis Delete: ' + JSON.stringify(err, undefiend, 2)); }
    });
});

module.exports = router;