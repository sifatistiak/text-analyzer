const fs = require('fs');

function countWords(text) {
    return text.split(/\s+/).filter(word => word !== '').length;
}

function countCharacters(text) {
    return text.replace(/\s/g, '').length;
}

function countSentences(text) {
    return text.split(/[.!?]/).filter(sentence => sentence !== '').length;
}

function countParagraphs(text) {
    return text.split('\n').filter(paragraph => paragraph !== '').length;
}

function findLongestWordsInParagraphs(text) {
    const paragraphs = text.split('\n').filter(paragraph => paragraph !== '');
    return paragraphs.map(paragraph =>
        paragraph.split(/\s+/).reduce((longest, word) => (word.length > longest.length ? word : longest), '')
    );
}

function readTextFromFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error('Error reading text from file:', error.message);
        return '';
    }
}

module.exports = {
    countWords,
    countCharacters,
    countSentences,
    countParagraphs,
    findLongestWordsInParagraphs,
    readTextFromFile,
};
