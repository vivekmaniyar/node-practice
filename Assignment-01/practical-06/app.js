const extract = require('extract-zip');
const path = require('path');

try {
    extract('./allfiles.zip', { dir: path.join(__dirname,'allfiles') }, function (err) {
        if (err) {
        console.log(err);
        }
    });
    console.log('Extracted');
} catch (err) {
    console.log(err);
}