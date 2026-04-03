const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it',
  'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these',
  'they', 'this', 'to', 'was', 'will', 'with', 'you', 'your', 'we', 'our', 'from', 'have',
  'has', 'had', 'can', 'could', 'should', 'would', 'do', 'does', 'did', 'about', 'more',
  'all', 'any', 'some', 'many', 'most', 'other', 'who', 'which', 'what', 'where', 'when',
  'how', 'why', 'whoever', 'whose', 'whom', 'wherever', 'whenever', 'however', 'whatever',
  // Common non-skill job description terms
  'experience', 'work', 'years', 'job', 'role', 'team', 'skills', 'required', 'preferred', 'must',
  'ability', 'strong', 'understanding', 'knowledge', 'excellent', 'working', 'using', 'proven',
  'including', 'related', 'environment', 'support', 'development', 'design', 'test', 'data'
]);

const WEAK_VERBS = ['did', 'worked on', 'responsible for', 'helped', 'assisted', 'managed to', 'was part of'];

function parseSections(text) {
  const sections = { header: [], skills: [], experience: [], projects: [], education: [] };
  const lines = text.split('\n');
  let currentSection = 'header'; // Start by capturing contact info

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const upper = trimmed.toUpperCase();
    
    if (upper === 'SKILLS' || upper.includes('TECHNICAL SKILLS')) currentSection = 'skills';
    else if (upper === 'EXPERIENCE' || upper === 'WORK EXPERIENCE' || upper === 'EMPLOYMENT') currentSection = 'experience';
    else if (upper === 'PROJECTS' || upper === 'PERSONAL PROJECTS') currentSection = 'projects';
    else if (upper === 'EDUCATION' || upper === 'ACADEMIC BACKGROUND') currentSection = 'education';
    else if (currentSection) {
      sections[currentSection].push(trimmed);
    }
  });
  return sections;
}

function findWeakBullets(text) {
  const weakBullets = [];
  const lines = text.split('\n');
  
  lines.forEach(line => {
    const trimmed = line.trim().replace(/^[-•*]\s*/, '').toLowerCase();
    if (trimmed.length > 10) {
      if (WEAK_VERBS.some(verb => trimmed.startsWith(verb))) {
         weakBullets.push(line.trim());
      }
    }
  });
  return weakBullets;
}

export const extractKeywords = (text) => {
  const words = text
    .replace(/[^a-zA-Z0-9+#\-\s]/g, ' ') // Keep C++, C#, etc.
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w.toLowerCase()));
  
  const freq = {};
  const exactCase = {}; 
  words.forEach(w => {
    const lower = w.toLowerCase();
    freq[lower] = (freq[lower] || 0) + 1;
    exactCase[lower] = w; 
  });
  return { freq, exactCase };
};

export function analyzeResume(resumeText, jdText) {

  const jdParams = extractKeywords(jdText);
  const resumeLowerText = resumeText.toLowerCase();

  const jdWords = Object.keys(jdParams.freq).sort((a, b) => jdParams.freq[b] - jdParams.freq[a]);
  const topKeywordsLower = jdWords.slice(0, 25);

  if (topKeywordsLower.length === 0) {
    return {
      score: 0,
      matched: [],
      missing: [],
      suggestions: ["We couldn't extract any meaningful keywords from the Job Description. It might be too short or generic."],
      weakBullets: findWeakBullets(resumeText),
      sectionFeedback: ["Ensure your resume sections are clearly labeled."],
      parsedSections: parseSections(resumeText)
    };
  }

  const matched = [];
  const missing = [];

  topKeywordsLower.forEach(kw => {
    const displayWord = jdParams.exactCase[kw] || kw;
    // Use lookarounds for robust matching of terms like C++, C#, .NET
    const regex = new RegExp(`(?<=^|[^a-zA-Z0-9+#-])` + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + `(?=[^a-zA-Z0-9+#-]|$)`, 'i');
    if (regex.test(resumeLowerText)) {
      matched.push(displayWord);
    } else {
      missing.push(displayWord);
    }
  });

  // Calculate score with more weight on missing keywords
  const rawScore = Math.round((matched.length / topKeywordsLower.length) * 100);
  const score = Math.max(15, Math.min(99, rawScore + (matched.length > 5 ? 5 : 0))); 

  // Advanced Analysis
  const weakBullets = findWeakBullets(resumeText);
  const sections = parseSections(resumeText);
  const sectionFeedback = [];
  const suggestions = [];

  if (sections.skills.length === 0 && !resumeLowerText.includes('skills')) {
    sectionFeedback.push("Add a dedicated 'Skills' section. ATS systems look for this specifically.");
  }
  if (sections.projects.length === 0 && !resumeLowerText.includes('project')) {
    sectionFeedback.push("Consider adding a 'Projects' section to showcase practical experience.");
  }

  if (weakBullets.length > 0) {
    suggestions.push(`Found ${weakBullets.length} weak bullet point(s). Use strong action verbs (e.g., 'Developed', 'Engineered', 'Optimized') instead of 'Did' or 'Worked on'.`);
  }

  if (score < 40) {
    suggestions.push("Critical missing keywords detected. Ensure you match the JD's specific terminology.");
  } else if (score < 75) {
    suggestions.push("You have a good baseline, but you are missing several key requirements. Try adding them to your Skills or Experience section.");
  } else {
    suggestions.push("Excellent match! Ensure your bullet points highlight achievements with measurable metrics (e.g. 'Improved efficiency by 20%').");
  }

  return {
    type: 'match',
    score,
    matched,
    missing,
    suggestions,
    weakBullets,
    sectionFeedback,
    parsedSections: sections
  };
}

// Generates a heuristic score WITHOUT a Job Description
export function analyzeGeneralResume(resumeText) {
  const sections = parseSections(resumeText);
  const weakBullets = findWeakBullets(resumeText);
  let baseScore = 40; // baseline 
  const suggestions = [];
  const sectionFeedback = [];
  const resumeLowerText = resumeText.toLowerCase();

  // 1. Structure Check (30 points)
  let structurePoints = 0;
  if (sections.skills.length > 0 || resumeLowerText.includes('skills')) structurePoints += 10;
  else sectionFeedback.push("Add a dedicated 'Skills' section. ATS systems look for this specifically.");

  if (sections.experience.length > 0 || resumeLowerText.includes('experience')) structurePoints += 10;
  else sectionFeedback.push("Experience section is missing or mislabeled.");

  if (sections.education.length > 0 || resumeLowerText.includes('education')) structurePoints += 10;
  else sectionFeedback.push("Education section is missing or mislabeled.");
  
  if (structurePoints === 30) {
    sectionFeedback.push("Great job! Your resume has standard ATS-friendly structural headers.");
  }
  
  baseScore += structurePoints;

  // 2. Metrics & Numbers Density (15 points)
  // Check if bullet points include % or measurable numbers
  const numberMatches = resumeText.match(/\d+%|\b\d+\b/g) || [];
  let impactScore = 0;
  if (numberMatches.length > 8) {
    impactScore = 15;
    suggestions.push("Excellent metric density. Your bullet points demonstrate proven impact.");
  } else if (numberMatches.length > 3) {
    impactScore = 8;
    suggestions.push("Good start on impact metrics. Try to quantify more of your achievements with data/percentages.");
  } else {
    suggestions.push("Low metric density. ATS systems value quantifiable achievements (e.g., 'Improved performance by 20%'). Add numbers where possible.");
  }
  
  baseScore += impactScore;

  // 3. Verb Analysis & Readability (15 points)
  let readabilityScore = 15;
  if (weakBullets.length > 3) {
    readabilityScore = 5;
    suggestions.push(`Found ${weakBullets.length} weak bullet point(s). Upgrade words like 'Did' or 'Worked on' to power verbs like 'Spearheaded' or 'Engineered'.`);
  } else if (weakBullets.length > 0) {
    readabilityScore = 10;
    suggestions.push(`A few bullet points could use stronger phrasing. See instant fixes below.`);
  }

  baseScore += readabilityScore;

  // Length Check
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount < 150) {
    suggestions.push("Your resume is very brief. Ensure you are detailing your responsibilities and education thoroughly.");
    baseScore -= 10;
  } else if (wordCount > 1000) {
    suggestions.push("Your resume might be too long and keyword-stuffed. Aim for a concise 1-2 page format.");
  }

  return {
    type: 'general',
    score: Math.min(100, Math.max(10, baseScore)),
    suggestions,
    weakBullets,
    sectionFeedback,
    parsedSections: sections,
    metricDensity: numberMatches.length
  };
}
