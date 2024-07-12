/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// import inquirer from 'inquirer';
// import qr from "qr-image";
// import fs from "fs"

// inquirer
// .prompt([
//     {
//         message: "Type in your URL: ",
//         name: "URL",
//     }
// ])
// .then((answers) => {
//     const url = answers.url;
//     var qr_svg = qr.image(url);
//     qr_svg.pipe(fs.createWriteStream("qr_img.png"));

//     writeFile('message.txt', url, (err) => {
//         if (err) throw err;
//         console.log('The file has been saved!');
//     }); 
// })

/* Case Sensitivity in JavaScript: JavaScript is case-sensitive, so the name you use in the prompt object should match the key used in the answers object exactly. You have used "URL" in the prompt object but then referenced it as answers.url (lowercase) in the then block.

Incorrect usage of writeFile: writeFile is not defined in your code. You should use fs.writeFile.

Missing Error Handling for Stream: You should handle the stream completion or error events when creating the QR image. */

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
.prompt([
    {
    message: 'Type in your URL: ',
      name: 'URL', // Use the same case as in answers
    },
])
.then((answers) => {
    const url = answers.URL; // Match the case used in the prompt
    const qr_svg = qr.image(url);
    const qrStream = fs.createWriteStream('qr_img.png');

    qr_svg.pipe(qrStream);

    qrStream.on('finish', () => {
    console.log('QR code image has been saved!');
    });

    qrStream.on('error', (err) => {
    console.error('Error saving QR code image:', err);
    });

    fs.writeFile('message.txt', url, (err) => {
    if (err) throw err;
    console.log('The URL has been saved in message.txt!');
    });
})
.catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
});