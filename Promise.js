/*
 * Promise.js
 * Copyright (C) 2016 Sushil Chhetri <Sushil.Chhetri@exponential.com>
 */
/*jshint esnext: true*/
(function() {
    "use strict";

    var exampleNumber = parseInt(process.argv[2], 10) || 0,
        exampleList = [];

    //simple Promise example
    exampleList.push(function() {
        var p = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve('Resolved after 1 sec asynchronously.');
            }, 1000);
        });

        p.then(function(res) {
            console.log('Logging response: ', res);
        });
    });

    //example with failure
    exampleList.push(function() {
        var p = new Promise(function(resolve, reject) {
            setTimeout(function() {
                reject('Rejecting after 1 sec asynchronously.');
            }, 1000);
        });

        p.then(null, function(reason) {
            console.log('Logging rejection with then: ', reason);
        });
    });

    //example with failure
    exampleList.push(function() {
        var p = new Promise(function(resolve, reject) {
            setTimeout(function() {
                reject('Rejecting after 1 sec asynchronously.');
            }, 1000);
        });

        p.catch(function(reason) {
            console.log('Logging rejection with catch: ', reason);
        });
    });

    //example with failure
    exampleList.push(function() {
        var p = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve('Resolved after 1 sec asynchronously.');
            }, 1000);
        });

        p
            .then(function(res) {
                throw new Error('Throwing on purpose');
            }, function(err) {
                console.log('will not catch error of it\'s own success callback');
            })
            .catch(function(reason) {
                console.log('I\'m catching all the errors: ', reason);
            });
    });

    (exampleList[exampleNumber] || function() {
        console.log('No example available for: ', exampleNumber);
    })();
})();
