import crypto from 'crypto';

module.exports = function namespace(name) {
  this.name = name;

  //this is here so the namespace can be confirmed to be the same
  //when invoked twice
  this.id = crypto.randomBytes(20).toString('hex');

  this.def = function def(fn) {
    if(!fn.name || fn.name === '') {
      throw new Error('Function name not defined');
    }

    if(Object.keys(this).includes(fn.name)) {
      throw new Error('Cannot redefine ' + fn.name);
    }
    this[fn.name] = fn;
  };
};
