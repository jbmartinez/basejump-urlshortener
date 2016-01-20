/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/new/*', require('./api/new'));

  app.route('/')
     .get(function(req, res) {
       res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
     });

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|assets)/*')
  //  .get(errors[404]);
};
