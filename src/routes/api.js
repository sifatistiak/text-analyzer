const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

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

    res.json({ success: true });
});

module.exports = router;
