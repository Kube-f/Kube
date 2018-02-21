import { expect } from 'chai';
import kubeESM from '../src';

const kubeCommonJS = require('../src');

/* eslint prefer-arrow-callback: 0, func-names: 0, no-unused-expressions: 0 */
describe('Importing The index module', function () {
  it('should import with ES6 modules `default`.', function () {
    expect(kubeESM).to.be.a('function');
  });

  it('should import with CommonJS modules `without default`.', function () {
    expect(kubeCommonJS).to.be.a('function');
  });
});

describe('Instantiating kube', function () {
  it('should be instantiatable', function () {
    const Kube = new kubeESM();
    expect(Kube).to.be.a('object');
  });
});

describe('Mounting modules', function () {
  it('should be able to mount a module', function () {
    function testModule() {
      this.moduleName = 'testModule';
      this.fn = function fn(a) {
        return a;
      };
    }

    const Kube = new kubeESM();
    Kube.mountModule(testModule);

    expect(Kube.testModule.fn).to.be.a('function');
  });

  it('should be able to pass arguments into modules', function () {
    /*eslint-disable no-unused-vars*/
    function testModule(kube, arg) {
      this.fn = function fn(kube, arg) {
        return kube;
      };
    }
    /*eslint-enable no-unused-vars*/
    const Kube = new kubeESM();
    Kube.mountModule(testModule, 'poop');
  });

  it('should be able to load a module that does not get loaded', function () {
    function testModuleTwo(kube, args) {
      this.meme = 'a';
    }

    const Kube = new kubeESM();
    Kube.loadModule(testModuleTwo);

    expect(function () {
      return Kube.testModuleTwo.meme;
    }).to.be.throw();
  });
});
