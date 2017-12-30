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
