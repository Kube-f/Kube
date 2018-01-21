import namespace from './kube/namespace';

export default function Kube() {
  this.namespaces = [];
  this.loadedModules = [];
  this.namespace = function namespace(name) {
    if(!name) {
      return null;
    }
    if(this.namespaceExists(name)) {
      return this.lookupNamespace(name);
    }

    return this.createNamespace(name);
  };

  this.namespaceExists = function namespaceExists(namespaceName) {
    return this.namespaces
      .filter(function handleNamespaceFilter(namespace) {
        return namespaceName === namespace.name;
      }).length > 0;
  };

  this.lookupNamespace = function lookupNamespace(namespaceName) {
    return this.namespaces
      .filter(function handleNamespaceFilter(namespace) {
        return namespaceName === namespace.name;
      })[0];
  };

  this.createNamespace = function createNamespace(name) {
    const newNamespace = new namespace(name);
    this.namespaces.push(newNamespace);
    return newNamespace;
  };

  this.mountModule = function mountModule(module, args) {
    const moduleInstance = new module(this, args);
    this[module.name] = {};
    //here we assume that the module is an object method
    Object.assign(this[module.name], moduleInstance);
    return moduleInstance;
  };
}
