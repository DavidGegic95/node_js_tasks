const csvtojson = require('csvtojson');
const fs = require('fs');

const csvFilePath = './csvdirectory/books.csv';
const txtFilePath = './csvdirectory/output.txt';

const processCSVFile = async () => {
    try {
        const readStream = fs.createReadStream(csvFilePath, 'utf8');
        const writeStream = fs.createWriteStream(txtFilePath, 'utf8');

        const csvToJsonConverter = csvtojson().preFileLine((line, index) => {
            console.log(`Reading line ${index + 1}: ${line}`);
            return line;
        });

        readStream.pipe(csvToJsonConverter).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log('Conversion completed successfully.');
        });

        readStream.on('error', (err) => {
            console.error(`Error reading CSV file: ${err.message}`);
        });

        writeStream.on('error', (err) => {
            console.error(`Error writing to TXT file: ${err.message}`);
        });
    } catch (error) {
        console.error(`Unexpected error: ${error.message}`);
    }
};

processCSVFile();
