'use strict';

const express = require('express');
const router = express.Router();
const Bucket = require('../models/bucket');
const moment = require('../public/vendor/moment/min/moment.min.js');
const List = require('../models/list');
const Item = require('../models/item');

router.get('/', (req, res) => {
  Bucket.find( (err, buckets ) =>{
    res.json(buckets);
  })
});

router.post('/', (req, res) =>{
  new Bucket({
    name: req.body.name,
    updatedAt: moment()
  }).save( (err, bucket) => {
    res.json(bucket);
  });
});

router.put('/:id', (req, res) => {
  let { name, description } = req.body;
  Bucket.findByIdAndUpdate(
    req.params.id,
    { $set: { name, description }},
    { new: true },
    (err, bucket) =>{
      res.json(bucket)
    }
  )
});

router.delete('/:id' , (req, res) => {
  let bucketId = req.params.id;
  Bucket.findById( bucketId, (err, bucket) => {
    bucket.remove();
    List.find({ bucketId } , (err, lists ) =>{
      lists.forEach( (err, index) =>{
        let list = lists[index];
        list.remove();
        Item.find({ 'listID': list._id}).remove().exec();
      });
    });
    res.status(200).send({ success:true });
  });
});

router.get('/:id', (req,res)=>{
  res.render('bucket');
})

module.exports = router;
