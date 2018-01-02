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
    const ns = new _namespace2.default(name);
    this.namespaces.push(ns);
    return ns;
  };

  //TODO
  this.mountModule = function mountModule(module) {
    const moduleInstance = new module();
    this[moduleInstance.moduleName] = {};
    //here we assume that the module is an object method
    Object.assign(this[moduleInstance.moduleName], moduleInstance);
  };
}
module.exports = exports['default'];