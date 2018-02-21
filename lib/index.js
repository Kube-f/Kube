'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Kube;

var _namespace = require('./kube/namespace');

var _namespace2 = _interopRequireDefault(_namespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Kube() {
  this.namespaces = [];
  this.loadedModules = [];
  this.namespace = function namespace(name) {
    if (!name) {
      return null;
    }
    if (this.namespaceExists(name)) {
      return this.lookupNamespace(name);
    }

    return this.createNamespace(name);
  };

  this.namespaceExists = function namespaceExists(namespaceName) {
    return this.namespaces.filter(function handleNamespaceFilter(namespace) {
      return namespaceName === namespace.name;
    }).length > 0;
  };

  this.lookupNamespace = function lookupNamespace(namespaceName) {
    return this.namespaces.filter(function handleNamespaceFilter(namespace) {
      return namespaceName === namespace.name;
    })[0];
  };

  this.createNamespace = function createNamespace(name) {
    const newNamespace = new _namespace2.default(name);
    this.namespaces.push(newNamespace);
    return newNamespace;
  };

  this.mountModule = function mountModule(module, args) {
    if (!this.loadedModules.includes(module.name)) {
      const moduleInstance = new module(this, args);

      this[module.name] = {};
      //here we assume that the module is an object method
      Object.assign(this[module.name], moduleInstance);
      this.loadedModules.push(module.name);
      return moduleInstance;
    }

    return this[module.name];
  };

  this.loadModule = function loadModule(module, args) {
    //check if module is already loaded
    if (!this.loadedModules.includes(module.name)) {
      /*eslint-disable no-new*/
      new module(this, args);
      /*eslint-enable no-new*/
      this.loadedModules.push(module.name);
    }
    return this;
  };
}
module.exports = exports['default'];