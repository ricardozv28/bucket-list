'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bucket = new Schema({
  name:{ type: String, required: true },
  description: String,
  updatedAt: Date
});

module.exports = mongoose.model('Bucket', Bucket);
