const JSZip = require('jszip');
const fs = require('fs');

const zip = new JSZip();

try{
    const pdfData = fs.readFileSync('nodejs-a1.pdf');
    zip.file('Assignment-questions.pdf', pdfData);

    const images = ["node-logo.png", "express-logo.png"];
    const img = zip.folder('images');

    for(const image of images){
        const imgData = fs.readFileSync(image);
        img.file(image, imgData);
    }

    zip.generateAsync({type: 'nodebuffer'})
        .then(function(content){
            fs.writeFileSync('allfiles.zip', content);
            console.log('zip file created');
        }
    );
} catch(err){
    console.log(err);
}