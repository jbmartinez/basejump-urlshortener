/* eslint-env node, mocha */

'use strict';

var should = require('should');
var app = require('./app');
var request = require('supertest');

describe('GET /new', function() {

  it('should respond with JSON object', function(done) {
    request(app)
      .get('/new/testing')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  // it('should parse natural language dates', function(done) {
  //   let natural = 'January 12, 2016';
  //   let unix = Date.parse(natural) / 1000;
  //   request(app)
  //     .get(`/${natural}`)
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       res.body.natural.should.equal(natural);
  //       res.body.unix.should.equal(unix);
  //       done();
  //     });
  // });
  //
  // it('should parse unix timestamps', function(done) {
  //   let natural = 'January 12, 2016';
  //   let unix = Date.parse(natural) / 1000;
  //   request(app)
  //     .get(`/${unix}`)
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       res.body.natural.should.equal(natural);
  //       res.body.unix.should.equal(unix);
  //       done();
  //     });
  // });
  //
  // it('should return null for anything else', function(done) {
  //   request(app)
  //     .get('/gibberish')
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       (res.body.natural === null).should.be.true;
  //       (res.body.unix === null).should.be.true;
  //       done();
  //     });
  // });
});

// describe('GET /', function() {
//
//   it('should respond with an HTML page', function(done) {
//     request(app)
//       .get('/')
//       .expect(200)
//       .expect('Content-Type', /html/)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         // res.body.should.be.instanceof(Object);
//         done();
//       });
//   });
// });
