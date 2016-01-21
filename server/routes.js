/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var randomstring = require('randomstring');
var validUrl = require('valid-url');
var Shortcut = require('./shortcut.model');
var urlFormat = require('url').format;

module.exports = function(app) {

  // Insert routes below
  // app.use('/new', require('./api/new'));

  // I cannot put this code in a different file, seemingly due to an express bug
  app.get(/^\/(?:new)\/(.+)/, (req, res) => {
    let url = req.params[0];
    // check for at least one dot in the url
    let hasDot = (/.+\..+/).test(url);

    if (!validUrl.isWebUri(url) || !hasDot) {
      return res.status(200).json({error: 'URL invalid'});
    }

    Shortcut.findOne({url}, (err, shortcut) => {
      if (err) {
        return handleError(res, err);
      }
      if (shortcut) {
        return res.status(200).json({shortcut: shortcut._id, url: shortcut.url});
      }

      let newRecord = {
        _id: randomstring.generate(7),
        url: url
      };

      Shortcut.create(newRecord, (err) => {
        if (err) {
          return handleError(res, err);
        }
        let formatted = urlFormat({
          protocol: req.protocol,
          host: req.get('host'),
          pathname: newRecord._id
        });
        return res.status(200).json({shortcut: formatted, url: newRecord.url});
      });
    });
  });

  // get a url and redirect
  app.get('/:str', (req, res) => {
    console.log('params', req.params);
    Shortcut.findOne({_id: req.params.str}, (err, shortcut) => {
      console.log('doc', shortcut);
      if (err) {
        return handleError(res, err);
      }
      if (shortcut) {
        return res.redirect(301, shortcut.url);
      } else {
        return errors[404](req, res);
      }
    });
  });

  app.route('/')
     .get(function(req, res) {
       res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
     });

  // All undefined asset or api routes should return a 404
  app.route('/:url(assets)/*')
   .get(errors[404]);
};

function handleError(res, err) {
  return res.status(500).send(err);
}
