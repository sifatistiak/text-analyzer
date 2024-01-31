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
}

function findLongestWordsInParagraphs(text) {
}

module.exports = {
    countWords,
    countCharacters,
    countSentences,
    countParagraphs,
    findLongestWordsInParagraphs,
};
