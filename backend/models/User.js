const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["student", "alumni", "admin"],
      default: "student"
    },
    profile: {
      // this is the "profile object"
      fullName: { type: String },
      phone: { type: String },
      education: { type: String },
      skills: { type: [String], default: [] },
      domain: { type: String },
      aboutMe: { type: String },

      // student-specific fields
      currentYear: { type: String },
      careerGoal: { type: String },
      mentorshipType: { type: String },
      targetIndustry: { type: String },

      // alumni-specific fields
      jobTitle: { type: String },
      company: { type: String },
      yearsExperience: { type: Number },
      mentorshipAreas: { type: [String], default: [] },
      availability: { type: Number }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
