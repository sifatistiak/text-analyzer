const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const analyzer = require('../utils/analyzer');
const db = require('../db/db');

const UPLOADS_DIR = './uploads/';

const router = express.Router();
router.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('text_analyzer_file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const text = analyzer.readTextFromFile(filePath);
    db.writeData({ text });

    res.json({ success: true });
});

router.get('/words', (req, res) => {
    const { text } = db.readData();
    const words = analyzer.countWords(text || '');
    res.json({ words });
});

router.get('/characters', (req, res) => {
    const { text } = db.readData();
    const characters = analyzer.countCharacters(text || '');
    res.json({ characters });
});

router.get('/sentences', (req, res) => {
    const { text } = db.readData();
    const sentences = analyzer.countSentences(text || '');
    res.json({ sentences });
});

router.get('/paragraphs', (req, res) => {
    const { text } = db.readData();
    const paragraphs = analyzer.countParagraphs(text || '');
    res.json({ paragraphs });
});

router.get('/longestWords', (req, res) => {
    const { text } = db.readData();
    const longestWords = analyzer.findLongestWordsInParagraphs(text || '');
    res.json({ longestWords });
});

module.exports = router;
