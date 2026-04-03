import { OpenAI } from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const weakVerbs = ['worked on', 'helped', 'assisted', 'responsible for', 'did', 'made', 'part of'];
const strongVerbs = ['Engineered', 'Orchestrated', 'Spearheaded', 'Developed', 'Optimized', 'Architected'];

const defaultTechKeywords = [
  'python', 'javascript', 'java', 'c++', 'react', 'node', 'express', 'sql', 'mongodb', 
  'aws', 'docker', 'kubernetes', 'git', 'ci/cd', 'agile', 'api', 'rest', 'graphql',
  'typescript', 'html', 'css', 'linux', 'cloud', 'architecture', 'scalability'
];

const extractBullets = (text) => {
  if (!text) return [];
  const lines = text.split('\n');
  return lines
    .filter(line => /^[-*•]/.test(line.trim()) || /^\d+\./.test(line.trim()))
    .map(line => line.replace(/^[-*•\d.]\s*/, '').trim())
    .filter(line => line.length > 5);
};

const extractKeywords = (text) => {
  const match = text.toLowerCase().match(/\b(\w+)\b/g);
  return match ? Array.from(new Set(match)) : [];
};

export const analyzeResumeContent = (resumeText, jdText = '') => {
  if (!resumeText) return { score: 0, missingKeywords: [], matchedKeywords: [], weakBullets: [] };

  const rTextLower = resumeText.toLowerCase();

  // 1. Section Detection (20 pts)
  let sectionScore = 0;
  const sections = [];
  const requiredSections = [
    { regex: /\b(education|academic|degree)\b/, name: 'Education' },
    { regex: /\b(experience|employment|work history)\b/, name: 'Experience' },
    { regex: /\b(skills|technologies|tools)\b/, name: 'Skills' },
    { regex: /\b(projects|portfolio)\b/, name: 'Projects' }
  ];

  requiredSections.forEach(sec => {
    if (sec.regex.test(rTextLower)) {
      sectionScore += 5; 
    } else {
      sections.push(`Missing section: ${sec.name}`);
    }
  });

  // 2. Keyword Matching (30 pts)
  let keywordScore = 0;
  let targetKeywords = jdText ? extractKeywords(jdText) : defaultTechKeywords;
  
  if (jdText && targetKeywords.length > 50) {
    targetKeywords = targetKeywords.filter(kw => kw.length > 4); 
  }

  const matchedKeywords = [];
  const missingKeywords = [];

  targetKeywords.forEach(kw => {
    const rx = new RegExp(`\\b${kw}\\b`, 'i');
    if (rx.test(resumeText)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const tkLen = targetKeywords.length;
  if (tkLen > 0) {
    keywordScore = Math.min(30, Math.round((matchedKeywords.length / tkLen) * 30));
  } else {
    keywordScore = 30;
  }

  // 3. Impact Metrics Detection (20 pts)
  let metricsScore = 0;
  const metricMatches = resumeText.match(/(\d+%|\$\d+|\b\d{2,}\b)/g) || [];
  const metricDensity = metricMatches.length;

  if (metricDensity >= 5) metricsScore = 20;
  else if (metricDensity >= 3) metricsScore = 15;
  else if (metricDensity >= 1) metricsScore = 10;

  // 4. Bullet Quality (20 pts)
  let bulletScore = 20;
  const bullets = extractBullets(resumeText);
  const weakBulletsFound = [];

  if (bullets.length === 0) {
    bulletScore = 0;
  } else {
    bullets.forEach(b => {
      const bLower = b.toLowerCase();
      for (let verb of weakVerbs) {
        if (bLower.startsWith(verb) || bLower.includes(` ${verb}`)) {
          if (!weakBulletsFound.includes(b)) weakBulletsFound.push(b);
          bulletScore = Math.max(0, bulletScore - 2); 
          break;
        }
      }
      
      if (b.split(' ').length < 5) {
        if (!weakBulletsFound.includes(b)) weakBulletsFound.push(b);
        bulletScore = Math.max(0, bulletScore - 1);
      }
    });
  }

  // 5. Formatting/Readability (10)
  let formatScore = 10;
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount < 150) formatScore = 5; 
  else if (wordCount > 1000) formatScore = 7; 

  const totalScore = sectionScore + keywordScore + metricsScore + bulletScore + formatScore;

  return {
    score: totalScore,
    type: jdText ? 'job' : 'general',
    matched: matchedKeywords.slice(0, 20),
    missing: missingKeywords.slice(0, 10),
    metricDensity,
    sectionFeedback: sections,
    weakBullets: weakBulletsFound.slice(0, 5),
    details: {
      sectionScore,
      keywordScore,
      metricsScore,
      bulletScore,
      formatScore,
      wordCount
    }
  };
};

export const improveBullet = async (bullet) => {
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system", 
          content: "You are an expert ATS resume reviewer. Rewrite the following resume bullet point to make it powerful, use a strong action verb, and ensure it sounds professional. Output ONLY the rewritten bullet point, no quotes or additional text."
        }, {
          role: "user",
          content: bullet
        }],
        max_tokens: 60
      });
      return response.choices[0].message.content.trim();
    } catch (err) {
      console.error('OpenAI Error, falling back to rule-based format:', err);
      return applyRuleBasedBulletImprovement(bullet);
    }
  } else {
    return applyRuleBasedBulletImprovement(bullet);
  }
};

const applyRuleBasedBulletImprovement = (bullet) => {
  let improved = bullet;
  const lowerB = bullet.toLowerCase();

  for (let wv of weakVerbs) {
    if (lowerB.startsWith(wv)) {
      const strongVerb = strongVerbs[Math.floor(Math.random() * strongVerbs.length)];
      improved = strongVerb + " " + bullet.substring(wv.length).trim();
      break;
    }
  }

  if (!/(\d+%|\$\d+|\b\d{2,}\b)/.test(improved)) {
    improved += ", achieving [Metric/Goal] by [X]%.";
  }

  return improved;
};

export const generateAtsResume = async (resumeData) => {
  if (openai) {
    try {
      const prompt = `
You are an expert ATS resume writer and recruiter-level evaluator.
Your job is to generate highly optimized, ATS-friendly resumes tailored to a specific job description.

STRICT RULES:
- Output must be ATS-safe (single-column, no tables, no icons, no graphics)
- Use clear section headings: Contact, Summary, Skills, Projects, Education, Certifications
- Use bullet points with measurable impact (numbers, metrics, results)
- Inject relevant keywords from the job description naturally
- Avoid hallucinations (do NOT invent experience or skills not provided)
- Keep language concise, professional, and achievement-focused
- Ensure formatting works for ATS parsers (like Workday, Taleo)

STYLE RULES:
- Strong action verbs (Built, Developed, Optimized, Led)
- Each bullet must show impact (e.g., "Improved X by 30%")
- No long paragraphs
- No fancy formatting

raw input:
\${JSON.stringify(resumeData)}

OUTPUT FORMAT:
Return a JSON object exactly matching the input keys (personalInfo, experience, education, projects, skills, certifications, achievements) but with the text contents rewritten to be highly professional, impactful, and ATS friendly. Keep the values as strings with line breaks. Do not include markdown formatting like \`\`\`json. Return ONLY clean structured JSON (no explanations).
`;
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system", 
          content: "You are a senior ATS resume optimizer."
        }, {
          role: "user",
          content: prompt
        }],
        max_tokens: 1500
      });
      let responseText = response.choices[0].message.content.trim();
      if(responseText.startsWith("\`\`\`json")) {
        responseText = responseText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
      }
      return JSON.parse(responseText);
    } catch (err) {
      console.error('OpenAI Error for Generate ATS:', err);
      throw new Error("Failed to generate AI resume");
    }
  } else {
    throw new Error("OpenAI API Key not configured. Cannot generate full resume.");
  }
};
