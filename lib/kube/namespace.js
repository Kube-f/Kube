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
    //disallow unnamed functions
    if (!fn.name || fn.name === '') {
      throw new Error('Function name not defined');
    }

    //disallow redefinitions
    if (Object.keys(this).includes(fn.name)) {
      throw new Error('Cannot redefine ' + fn.name);
    }
    this[fn.name] = fn;
  };
};