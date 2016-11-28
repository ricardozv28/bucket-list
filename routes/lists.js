'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const List = require('../models/list');
const Item = require('../models/item');

router.get('/', (req, res) =>{
  let query = List.find({});
  query.where('bucketId', req.query.bucketId);
  query.exec( (err, lists ) => {
    res.json(lists);
  });
});

router.post('/', (req, res) =>{
  let { name, bucketId } = req.body;
  new List({
    name,
    bucketId
  }).save( (err, list) => {
    res.json(list);
  });
});

router.put('/:id', (req, res ) => {
  List.findByIdAndUpdate(
    req.params.id,
    { $set: {name: req.body.name }},
    { new: true },
    (err, list) => {
      res.json(list)
    }
  );
});

router.delete('/:id', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    list.remove();
    Item.find({'listId': req.params.id}).remove().exec( (err, items) => {
      res.status(200).send({ success: true });
    });
  });
});

module.exports = router;
