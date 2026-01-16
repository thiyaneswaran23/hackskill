const User = require("../models/User");

// SAVE OR UPDATE PROFILE
exports.saveProfile = async (req, res) => {
  try {
    const userId = req.user.id;  // comes from JWT middleware
    const data = req.body;

    // Build profile object depending on role
    const profileData = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || null,
      education: data.education,
      skills: Array.isArray(data.skills) ? data.skills : data.skills.split(',').map(s => s.trim()),
      domain: data.domain,
      aboutMe: data.aboutMe || null,
    };

    if (req.user.role === "student") {
      profileData.currentYear = data.currentYear;
      profileData.careerGoal = data.careerGoal;
      profileData.mentorshipType = data.mentorshipType;
      profileData.targetIndustry = data.targetIndustry;
    } else if (req.user.role === "alumni") {
      profileData.jobTitle = data.jobTitle;
      profileData.company = data.company;
      profileData.yearsExperience = parseInt(data.yearsExperience);
      profileData.mentorshipAreas = Array.isArray(data.mentorshipAreas) 
        ? data.mentorshipAreas 
        : data.mentorshipAreas.split(',').map(s => s.trim());
      profileData.availability = parseInt(data.availability);
    }

    // Save profile in user document
    const user = await User.findByIdAndUpdate(
      userId,
      { profile: profileData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Profile saved successfully",
      profile: user.profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("profile role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      role: user.role,
      profile: user.profile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};