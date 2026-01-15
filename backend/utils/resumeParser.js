// /backend/utils/resumeParser.js

const extractEmail = (text) =>
    text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] || "";
  
  const extractPhone = (text) =>
    text.match(/(\+?\d{1,3}[- ]?)?\d{10}/)?.[0] || "";
  
  const extractName = (text) =>
    text.split("\n")[0]?.trim() || "";
  
  const extractSkills = (text) => {
    const skills = ["JavaScript", "React", "Node", "Python", "Java", "MongoDB"];
    return skills.filter(skill =>
      text.toLowerCase().includes(skill.toLowerCase())
    );
  };
  
  const extractEducation = (text) => {
    if (text.toLowerCase().includes("bachelor")) return "Bachelor Degree";
    if (text.toLowerCase().includes("master")) return "Master Degree";
    return "";
  };
  
  const extractDomain = (text) => {
    if (text.toLowerCase().includes("software")) return "Software Development";
    if (text.toLowerCase().includes("data")) return "Data Science";
    return "";
  };
  
  module.exports = {
    extractEmail,
    extractPhone,
    extractName,
    extractSkills,
    extractEducation,
    extractDomain
  };
  