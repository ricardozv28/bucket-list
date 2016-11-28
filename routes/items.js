'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../models/item');

router.get('/', (req, res) => {
  let query = Item.find({});
  query.where('listId', req.query.listId);
  query.exec((err, items) =>{
    res.json(items);
  })
})

router.post('/', (req,res) =>{
  let {name, listId} = req.body
  new Item({
    name,
    listId
  }).save( (err,item) =>{
    res.json(item);
  });
});

router.put('/:id', (req,res) =>{
  let { name }= req.body;
  Item.findByIdAndUpdate(
    req.params.id,
    { $set: {name}},
    { new: true},
    (err, item) => {
      res.json(item);
    }
  );
});

router.delete('/:id', (req,res) =>{
  Item.findById(req.params.id, (err, item) =>{
    item.remove();
  });
  res.status(200).send({success:true});
})

module.exports = router;
