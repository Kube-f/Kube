# Kube

The Kube framework.

## installing

### Just Kube
```bash
  $ git clone git@github.com:Kube-f/Kube.git
  $ cd Kube
  $ yarn install
```

### Through yarn

`$ yarn add kube-f`

## quickstart

```js
import Kube from 'kube';

const myKube = new Kube();
const aNamespace = myKube.namespace('aNamespace');

aNamespace.def(function coolFunction(a) {
  return a;
});

aNamespace.coolFunction('hello kube!')
  .then(function handleCoolFunctionResult(a) {
    console.log(a); //hello kube!
  });
```

## Docs

### `Kube()`

The Kube object is the focus of this framework. It keeps track of the global state aswell as
the namespaces you define on it. It has few functionalities, but the ones it does have are
quite usefull.

the `Kube` object should only be instantiated once across your application, this is to prevent
undefined behaviour when you try to access namespaces from other kubes. The `Kube` object
can be instantiated like so:

```js
const myKube = new Kube();
```

### `.namespace()`

Within your `Kube` object, you can instantiate so called **namespaces**. These namespaces serve
as a clean way to keep different parts of your application seperated from eachother. This being said,
it is also extremely easy to access different namespaces defined on the same `Kube()` instance.

You can define a namespace like so:

```js
  const myNamespace = myKube.namespace('myNamespace'); //instantiating the namespace
  const alsoMyNamespace = myKube.namespace('myNamespace'); //importing the namespace
```

As you can see, once a namespace is created, it cannot be redefined. This is done
so you can import the namespace wherever you want once it is defined elsewhere and use
the functions defined on it.

### `.def(fn)`

`.def(fn)` is a function that is present on all namespaces that allows you to define
a function on the namespace itself. This means that functions defined on a certain
namespace can only be used when the namespace is imported.

For example, this is how it can be used:

```js
  const myNamespace = myKube.namespace('myNamespace');
  
  myNamespace.def(function myCoolFunction(a) {
    return a;
  });
  
  console.log(myNamespace.myCoolFunction('hello kube!')); //logs "hello kube!"
```

`.def()` does require you to provide a named function, this means that the following example
will yield an `Function name not defined` error. This error will be thrown by kube itself.


```js
  const myNamespace = myKube.namespace('myNamespace');
  
  myNamespace.def(function (a) {
    return a;
  }); //throws "Function name not defined" error
  
```

### `mountModule(fn)` **WIP**

The `loadModule(fn)` function allows for extra modules to be loaded onto the `Kube()` object.
These modules can be anything from complete HTTP libraries such as [kube-http](https://github.com/Kube-f/Kube-http) or small util function sets.

A module can be mounted onto the `Kube()` object like so.

```js
import kube from 'kube';
import http from 'kube-http'

const myKube = new Kube();

myKube.mountModule(http);

myKube.get('/', (req, res) => {
  res.send(200);
});

myKube.listen(8080);
```

