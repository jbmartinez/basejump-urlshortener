'use strict';

var express = require('express');
var controller = require('./new.controller');

var router = express.Router();

router.get(/^\/(?:new)\/(.+)/, controller.save);
// router.get(':url(*)', controller.save);

module.exports = router;
