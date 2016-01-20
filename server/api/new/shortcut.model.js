'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShortcutSchema = new Schema({
  _id: String,
  url: String
},
{
  timestamps: true
});

ShortcutSchema.index({url: 1});

module.exports = mongoose.model('Shortcut', ShortcutSchema);
