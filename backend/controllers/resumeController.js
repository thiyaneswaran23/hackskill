// controllers/resumeController.js
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

// Domains and keywords to auto-detect field values
const DOMAIN_KEYWORDS = {
  "Web Development": ["HTML", "CSS", "JavaScript", "React", "Node", "Express", "MERN"],
  "Data Science": ["Python", "Pandas", "NumPy", "Machine Learning", "TensorFlow", "PyTorch"],
  "Mobile Development": ["Android", "iOS", "Flutter", "React Native", "Kotlin", "Swift"],
  "AI/ML": ["AI", "Artificial Intelligence", "ML", "Machine Learning", "Deep Learning"],
  "Cloud Computing": ["AWS", "Azure", "GCP", "Cloud", "Docker", "Kubernetes"],
  "Cybersecurity": ["Security", "Penetration Testing", "Network", "Cryptography"],
  "Embedded Systems": ["IoT", "Embedded", "Arduino", "Raspberry Pi"]
};

// Helper functions
function detectDomain(skills) {
  skills = skills.map(s => s.toLowerCase());
  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    if (keywords.some(kw => skills.includes(kw.toLowerCase()))) {
      return domain;
    }
  }
  return "General";
}

function inferYearOfStudy(educationText) {
  const match = educationText.match(/(First|Second|Third|Fourth|Final)\sYear/i);
  return match ? match[0] : "";
}

function inferCareerGoal(resumeText) {
  const match = resumeText.match(/(seeking|aspiring|looking for)\s+(internship|job|role|position)\s+(as|in)\s+(.*?)([\.\n]|$)/i);
  return match ? match[4].trim() : "";
}

function extractAboutMe(resumeText) {
  const lines = resumeText.split("\n").map(l => l.trim()).filter(Boolean);
  return lines.slice(0, 3).join(" ");
}

exports.parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume uploaded" });
    }

    // Load PDF
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(req.file.buffer) });
    const pdf = await loadingTask.promise;

    let resumeText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      resumeText += content.items.map(it => it.str).join(" ") + "\n";
    }

    console.log("📄 Extracted PDF Text:\n", resumeText);

    if (resumeText.trim().length < 50) {
      return res.status(400).json({ message: "Resume unreadable or image-based" });
    }

    // --- REGEX EXTRACTION ---
    const nameMatch = resumeText.match(/^([A-Z][a-z]+(?: [A-Z][a-z]+)+)/m);
    const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
    const phoneMatch = resumeText.match(/(\+?\d{1,3}[-.\s]?)?\d{10}/);
    const educationMatch = resumeText.match(/Education\s*(.*?)(Skills|Projects|Experience|$)/is);
    const skillsMatch = resumeText.match(/Skills\s*(.*?)(Education|Projects|Experience|$)/is);

    const skillsArray = skillsMatch
      ? skillsMatch[1].split(/,|;|\n/).map(s => s.trim()).filter(Boolean)
      : [];

    const educationText = educationMatch ? educationMatch[1].trim().replace(/\n+/g, " ") : "";
    const domain = detectDomain(skillsArray);
    const currentYear = inferYearOfStudy(educationText);
    const careerGoal = inferCareerGoal(resumeText);
    const aboutMe = extractAboutMe(resumeText);

    // Optional: default mentorship type
    const mentorshipType = "All of the above";

    const extracted = {
      fullName: nameMatch ? nameMatch[0].trim() : "",
      email: emailMatch ? emailMatch[0].trim() : "",
      phone: phoneMatch ? phoneMatch[0].trim() : "",
      education: educationText,
      skills: skillsArray,
      domain: domain,
      aboutMe: aboutMe,
      // Student fields
      currentYear: currentYear,
      careerGoal: careerGoal,
      mentorshipType: mentorshipType,
      targetIndustry: domain
    };

    console.log("✅ Extracted Resume Data:", extracted);
    res.status(200).json(extracted);

  } catch (err) {
    console.error("❌ Resume Parse Error:", err);
    res.status(500).json({ message: "Resume parsing failed", error: err.message });
  }
};
