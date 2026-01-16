const User = require("../models/User");

exports.getRecommendedMentors = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get student
    const student = await User.findById(studentId);

    if (!student || student.role !== "student") {
      return res.status(403).json({ message: "Only students allowed" });
    }

    // Safe profile values
    const studentProfile = student.profile || {};
    const studentSkills = studentProfile.skills || [];
    const studentDomain = studentProfile.domain || "";
    const studentGoal = studentProfile.careerGoal || "";

    // Fetch alumni
    const alumniList = await User.find({ role: "alumni" });

    const recommendations = alumniList.map(alumni => {
      const a = alumni.profile || {};
      const mentorSkills = a.mentorshipAreas || [];

      // Skill overlap
      const commonSkills = mentorSkills.filter(skill =>
        studentSkills.includes(skill)
      );

      const skillScore =
        (commonSkills.length / Math.max(studentSkills.length, 1)) * 35;

      // Domain match (soft match)
      const domainScore = mentorSkills.includes(studentDomain) ? 25 : 10;

      // Career alignment
      const careerScore =
        a.jobTitle &&
        studentGoal &&
        a.jobTitle.toLowerCase().includes(studentGoal.toLowerCase())
          ? 20
          : 10;

      // Experience
      const experienceScore = a.yearsExperience >= 5 ? 10 : 5;

      // Availability
      const availabilityScore = a.availability >= 3 ? 10 : 5;

      const matchScore = Math.round(
        skillScore +
          domainScore +
          careerScore +
          experienceScore +
          availabilityScore
      );

      return {
        _id: alumni._id,
        fullName: a.fullName,
        jobTitle: a.jobTitle,
        company: a.company,
        yearsExperience: a.yearsExperience,
        mentorshipAreas: mentorSkills,
        matchScore,
        matchReason:
          commonSkills.length > 0
            ? `Matched based on skills: ${commonSkills.join(", ")}`
            : "Matched based on career goal and domain"
      };
    });

    // Sort and filter
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    const filtered = recommendations.filter(r => r.matchScore >= 40);

    res.json(filtered.slice(0, 5));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate recommendations" });
  }
};
