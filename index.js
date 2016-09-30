'use strict';

const googleImages = require('google-images');
var http = require('http');
var fs = require('fs');
var APIkeys = require('./keys');
var images;

var download = function(url, dest, cb) {
    var filename = url.split("/")[url.split("/").length - 1];
    var file = fs.createWriteStream(dest + filename);
    var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb); // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

function imageCB(data) {

    console.log(data);

}

let client = googleImages(APIkeys.credentials()[0],APIkeys.credentials()[1]);

var findImage = function() {
    client.search('colours').then(function(images) {

        images = images;

        for (var n = 0; n < images.length; n++) {
            download(images[n].url, '/Users/manolis.perrakis/Documents/Repos/node-image-search/images/');
        }

    })
}

findImage();