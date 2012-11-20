/***
 * hEaDstorage
 *      Author: Yen-Chun Hsu (headhsu2568)
 *      Source: https://github.com/headhsu2568/storage
 *
 *      a storage structure which can be used to implement HTML5 WebStorage, server-side session, etc.
 *      reference: Github - coolaj86 / node-LocalStorage (https://github.com/coolaj86/node-LocalStorage)
 *
 ***/

"use strict";
var fs = require('fs');

function Storage(strgFile, auto) {
    this.strg = {};
    if(strgFile != null) this.strgFile = strgFile;

    /*** 
     * this.auto: 
     *      true: auto create file when new Storage object and wont delete file when storage is empty 
     *      false: auto delete file when storage is empty and wont create file when new Storage object
     ***/
    if(auto != null) this.auto = auto;
    else this.auto = false;

    if(strgFile == null) {
        console.log('[Error] Storage: strgFile cannot be empty');
        return null;
    }

    if(fs.existsSync(this.strgFile)) {
        /*** load the storage from file if exists ***/

        this.strg = JSON.parse(fs.readFileSync(this.strgFile, 'utf8'));
    }
    else {
        /*** create a new storage in memory if not exists ***/

        this.strg = {};
        if(this.auto) fs.writeFileSync(this.strgFile, '{}', 'utf8');
    }
}

Storage.prototype.strg = null;
Storage.prototype.strgFile = null;
Storage.prototype.auto = null;

/*** destroy the storage forcely (ignore this.auto) ***/
Storage.prototype.destroy = function() {
    for(var key in this.strg) {
        delete this.strg[key];
    }
    if(fs.existsSync(this.strgFile)) fs.unlinkSync(this.strgFile);
}

/*** update this.strg to physical file [this.strgFile] ***/
Storage.prototype.save = function() {
    if(this.length == 0 && !this.auto && fs.existsSync(this.strgFile)) fs.unlinkSync(this.strgFile);
    else {
        var json = JSON.stringify(this.strg);
        fs.unlinkSync(this.strgFile);
        fs.writeFileSync(this.strgFile, json, 'utf8');
    }
}

/*** HTML5 WebStorage API below ***/
Storage.prototype.getItem = function(key) {
    key = '_' + key;
    return (typeof this.strg[key] === 'undefined')?null:this.strg[key];
}
Storage.prototype.setItem = function(key, value) {
    key = '_' + key;
    var f = false; 
    if(typeof this.strg[key] === 'undefined') f = true;
    else if(is_object(value)) {
        var valueStr = JSON.stringify(value);
        var itemStr = JSON.stringify(this.strg[key]);
        if(valueStr != itemStr) f = true;
    }
    else if(String(this.strg[key]) != String(value)) f = true;

    if(f) {
        this.strg[key] = value;
        var json = JSON.stringify(this.strg);
        console.log(json);
        if(this.length == 1 && !this.auto) fs.writeFileSync(this.strgFile, json, 'utf8');
        else {
            var strgFile = this.strgFile;
            fs.unlinkSync(this.strgFile);
            fs.writeFileSync(this.strgFile, json, 'utf8');
        }   
    }
}
Storage.prototype.removeItem = function(key) {
    key = '_' + key;
    delete this.strg[key];
    if(this.length == 0 && !this.auto && fs.existsSync(this.strgFile)) fs.unlinkSync(this.strgFile);
    else {
        var json = JSON.stringify(this.strg);
        fs.unlinkSync(this.strgFile);
        fs.writeFileSync(this.strgFile, json, 'utf8');
    }
}
Storage.prototype.clear = function() {
    for(var key in this.strg) {
        delete this.strg[key];
    }
    if(!this.auto) fs.unlinkSync(this.strgFile);
}
Storage.prototype.key = function(i) {
    i = i || 0;
    return Object.keys(this.strg)[i];
}
Storage.prototype.__defineGetter__('length', function() {
        return Object.keys(this.strg).length;
        });

module.exports = Storage;

function is_object(obj) {
    if(obj == null) return false;
    else if(typeof obj == 'object' && Object.prototype.toString.call(obj) !== '[object Array]') return true;
    else return false;
}

