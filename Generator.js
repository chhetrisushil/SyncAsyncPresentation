/*
 * Generator.js
 * Copyright (C) 2016 Sushil Chhetri <Sushil.Chhetri@exponential.com>
 */
/*jshint esnext: true*/
(function() {
    "use strict";

    var exampleNumber = parseInt(process.argv[2], 10) || 0,
        exampleList = [];

    //simple generator example
    exampleList.push(function() {
        function* g() {
            yield 'd';

            return 'a';
        }

        var x = g();

        console.log(x.next());
        console.log(x.next());
    });

    //Async with Generator - no fail scenario
    exampleList.push(function() {
        var it = g();

        it.next();

        function getFile(fileName) {
            var fs = require('fs');

            fs.readFile(fileName, function(err, buffer) {
                if (err) {
                    it.throw(err);
                }

                it.next(buffer.toString());
            });
        }

        function* g() {
            var result1 =
                yield getFile('./PromisePresentation.md');
            console.log(result1);
            var result2 =
                yield getFile('./Generator.js');
            console.log(result2);
        }
    });

    //Async with Generator - fail scenario
    exampleList.push(function() {
        var it = g();

        it.next();

        function getFile(fileName) {
            var fs = require('fs');

            fs.readFile(fileName, function(err, buffer) {
                if (err) {
                    it.throw(err);
                }

                it.next(buffer.toString());
            });
        }

        function* g() {
            var result1 =
                yield getFile('./PromisePresentation.md');
            console.log(result1);
            var result2 =
                yield getFile('./nofile');
            console.log(result2);
        }
    });

    (exampleList[exampleNumber] || function() {
        console.log('No example available for: ', exampleNumber);
    })();
})();
