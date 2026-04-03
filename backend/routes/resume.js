import express from 'express';
import multer from 'multer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import mammoth from 'mammoth';
import Resume from '../models/Resume.js';
import { analyzeResumeContent, improveBullet, generateAtsResume } from '../services/scoringEngine.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let extractedText = '';
    const fileBuffer = req.file.buffer;

    if (req.file.mimetype === 'application/pdf') {
      const data = await pdf(fileBuffer);
      extractedText = data.text;
    } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const data = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = data.value;
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Only PDF and DOCX are supported.' });
    }

    res.json({ text: extractedText });
  } catch (err) {
    console.error('Error parsing file:', err);
    res.status(500).json({ error: 'Failed to process document' });
  }
});

router.post('/analyze', async (req, res) => {
  try {
    const { text, jdText, userId } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    const analysis = analyzeResumeContent(text, jdText);

    if (userId) {
      let doc = new Resume({ userId, text, lastAnalysis: analysis });
      await doc.save();
    }

    res.json(analysis);
  } catch (err) {
    console.error('Error analyzing text:', err);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

router.post('/improve-bullet', async (req, res) => {
  try {
    const { bullet } = req.body;
    if (!bullet) return res.status(400).json({ error: 'Bullet text required' });

    const improved = await improveBullet(bullet);
    res.json({ improved });
  } catch (err) {
    console.error('Error improving bullet:', err);
    res.status(500).json({ error: 'Failed to improve bullet' });
  }
});

router.post('/generate-ats', async (req, res) => {
  try {
    const { resumeData } = req.body;
    if (!resumeData) return res.status(400).json({ error: 'Resume data required' });

    const rewrittenData = await generateAtsResume(resumeData);
    res.json(rewrittenData);
  } catch (err) {
    console.error('Error generating ATS resume:', err);
    res.status(500).json({ error: err.message || 'Failed to generate ATS resume' });
  }
});

export default router;
