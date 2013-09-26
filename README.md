hEaDstorage
===========

#### v0.1.1

A persistent storage which provides HTML5 WebStorage-like APIs for Node.js

Install
-------
    npm install headstorage

How to use
----------
    var HEADSTORAGE = require('headstorage');
    var storagePath = 'storageFile';
    var storage = new HEADSTORAGE(storagePath, true);

Manipulation
------------
    // Set an item by specific key
    storage.setItem('name', 'hEaD');

    // Get an item by specific key
    var name = storage.getItem('name');

    // Remove an item by specific key
    storage.removeItem('name');

    // Remove all items
    storage.clear();

    // Get the n-th item
    var item = storage.key(n);

    // Get the amount of items
    var amount = storage.length;

<br />
- - -
###### by _Yen-Chun Hsu_ #######
- - -
