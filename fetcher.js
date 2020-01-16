//pageFetcher
const request = require('request');
const fs = require("fs");

if (process.argv.length < 3) {
  console.log('Error:  not enough command line arguments');
  console.log('Useage: node page-fetcher.js urlWithHTTP savefilename');
} else {
  let URL = process.argv[2];
  const outputFile = process.argv[3];

  // check if URL has necessary prefix
  const httpPrefix = 'http://';
  if (URL.substr(0, 7) !== (httpPrefix)) {
    URL = httpPrefix + URL;
  }

  console.log(`Requesting ${URL}...`);
  request(URL, (error, response, body) => {
    if (!error) {
      console.log(`Saving to ${outputFile}...`);
      fs.writeFile(outputFile, body,() => {
        console.log(`Downloaded and saved ${fs.statSync(outputFile).size} Kbytes to ${outputFile}`);
      });
    } else {
      console.log("Fetching cancelled due to error: " + error.code);
    }
  });
}