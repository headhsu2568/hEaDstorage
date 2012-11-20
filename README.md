hEaDstorage
======

A persistent storage for Node.js

Install
-------
    npm install headstorage

How to use
----------
    var S = require('headstorage');
    var storagePath = 'storageFile';
    var storage = new S(storagePath, true);

Manipulation
------------
#### Set an item by specific key ####
    storage.setItem('name', 'hEaD');

#### Get an item by specific key ####
    var name = getItem('name');

#### Remove an item by specific key ####
    storage.removeItem('name');

#### Remove all items ####
    storage.clear();

#### Get the n-th item ####
    var item = storage.key(n);

#### Get the amount of items ####
    var amount = storage.length;