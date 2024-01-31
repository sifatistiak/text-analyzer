const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

function readData() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

function writeData(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath, jsonData, 'utf8');
}

module.exports = {
    readData,
    writeData,
};
