import crypto from 'crypto';
import Promise from 'bluebird';

module.exports = function namespace(name) {
  this.name = name;

  //this is here so the namespace can be confirmed to be the same
  //when invoked twice
  this.id = crypto.randomBytes(20).toString('hex');

  this.def = function def(fn) {
    //disallow unnamed functions
    if(!fn.name || fn.name === '') {
      throw new Error('Function name not defined');
    }

    //disallow redefinitions
    if(Object.keys(this).includes(fn.name)) {
      throw new Error('Cannot redefine ' + fn.name);
    }
    this[fn.name] = Promise.method(fn);
  };
};
