'use strict';

// var _ = require('lodash');
var randomstring = require('randomstring');
var Shortcut = require('./shortcut.model');

// Creates a new venue in the DB.
exports.save = function(req, res) {
  console.log('url', req.params);
  Shortcut.findOne({url: req.params.url}, function(err, shortcut) {
    if (err) {
      return handleError(res, err);
    }
    if (shortcut) {
      console.log('record found');
      return res.status(200).json({shortcut: shortcut._id, url: shortcut.url});
    }

    let newRecord = {
      _id: randomstring.generate(7),
      url: req.params.url
    };

    Shortcut.create(newRecord, function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json({shortcut: newRecord._id, url: newRecord.url});
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
