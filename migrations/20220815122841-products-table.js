'use strict';
var path = require('path');
var fs = require('fs');
var type;
var seed;
var dbm;
var Promise;
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};
exports.up = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20220815122841-products-table-up.sql');
  return new Promise( function( resolve, reject ) {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (err) return reject(err);
      resolve(data);
    });
  })
  .then(function(data) {
    return db.runSql(data);
  });
};
exports.down = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20220815122841-products-table-down.sql');
  return new Promise( function( resolve, reject ) {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (err) return reject(err);
      resolve(data);
    });
  })
  .then(function(data) {
    return db.runSql(data);
  });
};
exports._meta = {
  "version": 1
};
