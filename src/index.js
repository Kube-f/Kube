import namespace from './kube/namespace';

export default function Kube() {
  this.namespaces = [];

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
    const ns = new namespace(name);
    this.namespaces.push(ns);
    return ns;
  };

  //TODO
  this.mountModule = function mountModule() {

  }
}
