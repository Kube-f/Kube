'use strict';

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function namespace(name) {
  this.name = name;

  //this is here so the namespace can be confirmed to be the same
  //when invoked twice
  this.id = _crypto2.default.randomBytes(20).toString('hex');

  this.def = function def(fn) {
    //TODO
    if (Object.keys(this).includes(fn.name)) {
      throw new Error('Cannot redefine ' + fn.name);
    }
    //make check that it cant overwrite default functions
    this[fn.name] = fn;
  };
};