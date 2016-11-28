'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
  name: { type: String, required: true },
  listId: { type: String, required: true}
});

module.exports = mongoose.model('Item', Item);
