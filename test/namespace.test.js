import { expect } from 'chai';
import kubeESM from '../src';

/* eslint prefer-arrow-callback: 0, func-names: 0, no-unused-expressions: 0 */
describe('Namespaces', function () {
  const Kube = new kubeESM();

  it('should be able to create a new namespace', function () {
    expect(Kube.namespace).to.be.a('function');
  });

  it('should be able to instantiate a namespace', function () {
    const testNamespace = Kube.namespace('testNamespace');
    expect(testNamespace).to.be.a('object');
  });

  it('should have a random id', function () {
    const namespaceNames = ['a', 'b', 'c', 'd'];
    const namespaces = namespaceNames
      .map(function handleNamespaceName(name) {
        return Kube.namespace(name);
      });

    const namespaceIds = namespaces
      .map(function handleNamespace(namespace) {
        return namespace.id;
      });

    const uniqueIds = Array.from(new Set(namespaceIds));
    expect(uniqueIds.length).to.be.equal(namespaceIds.length);
  });

  it('should give me the same namespace when i call it twice', function () {
    const testNamespace = Kube.namespace('testNamespace2');
    const sameNamespace = Kube.namespace('testNamespace2');
    expect(testNamespace.id).to.equal(sameNamespace.id);
    expect(testNamespace.name).to.equal(sameNamespace.name);
  });

  it('should be able to define a function on itself', function () {
    const testNamespace3 = Kube.namespace('testNamespace3');

    testNamespace3.def(function testFunc(a) {
      return a;
    });

    expect(testNamespace3.testFunc).to.be.a('function');
  });

  it('should be able to call a function defined on itself', function () {
    const testString = 'test';
    const testNamespace = Kube.namespace('testnamespace4');
    testNamespace.def(function testFunc(a) {
      return a;
    });

    const functionReturn = testNamespace
      .testFunc(testString);
    expect(functionReturn).to.not.equal(testString);
  });

  it('should not allow me to define a function twice', function () {
    const testFunction = function testFunction(a) {
      return a;
    };
    const testNamespace = Kube.namespace('testNamespace5');
    testNamespace.def(testFunction);
    expect(function () { testNamespace.def(testFunction); }).to.throw();
  });

  it('should not allow me to define unnamed functions', function () {
    const testNamespace = Kube.namespace('namespace6');
    expect(function () {
      testNamespace.def(function (a) {
        return a;
      });
    }).to.throw();
  });
});
