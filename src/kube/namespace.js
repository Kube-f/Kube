import crypto from 'crypto';

module.exports = function namespace(name) {
  this.name = name;

  //this is here so the namespace can be confirmed to be the same
  //when invoked twice
  this.id = crypto.randomBytes(20).toString('hex');

  this.def = function def(fn) {
    //TODO
    if(Object.keys(this).includes(fn.name)) {
      throw new Error('Cannot redefine ' + fn.name);
    }
    //make check that it cant overwrite default functions
    this[fn.name] = fn;
  };
};
