import { useState, useEffect } from 'react';
import './ProfileSetup.css';

function ProfileSetup() {
  const [userRole, setUserRole] = useState('student');
  const [formData, setFormData] = useState({
    // Common fields
    fullName: '',
    email: '',
    phone: '',
    education: '',
    skills: '',
    domain: '',
    aboutMe: '',
    // Student-only fields
    currentYear: '',
    careerGoal: '',
    mentorshipType: '',
    targetIndustry: '',
    // Alumni-only fields
    jobTitle: '',
    company: '',
    yearsExperience: '',
    mentorshipAreas: '',
    availability: ''
  });
  const [errors, setErrors] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);

  useEffect(() => {
    // Read role from localStorage
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserRole(user.role?.toLowerCase() || 'student');
        // Pre-fill email and name if available
        if (user.email) setFormData(prev => ({ ...prev, email: user.email }));
        if (user.name) setFormData(prev => ({ ...prev, fullName: user.name }));
      }
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({
          ...prev,
          resume: 'Please upload a PDF file only'
        }));
        return;
      }
      setResumeFile(file);
      setIsResumeUploaded(true);
      setErrors(prev => ({
        ...prev,
        resume: ''
      }));

      // Simulate resume parsing with mock data
      setTimeout(() => {
        const mockExtractedData = {
          fullName: formData.fullName || 'John Doe',
          email: formData.email || 'john.doe@example.com',
          phone: '+1234567890',
          education: 'Bachelor of Science in Computer Science',
          skills: 'JavaScript, React, Node.js, Python',
          domain: 'Software Development',
          aboutMe: 'Experienced software developer with passion for web technologies.',
          ...(userRole === 'student' ? {
            currentYear: 'Final Year',
            careerGoal: 'Software Engineer',
            targetIndustry: 'Technology'
          } : {
            jobTitle: 'Senior Software Engineer',
            company: 'Tech Corp',
            yearsExperience: '5',
            mentorshipAreas: 'Career Guidance, Technical Skills'
          })
        };

        setFormData(prev => ({
          ...prev,
          ...mockExtractedData
        }));
      }, 1000);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Common required fields
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.education.trim()) newErrors.education = 'Education is required';
    if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
    if (!formData.domain.trim()) newErrors.domain = 'Domain/Interest area is required';

    // Student-only required fields
    if (userRole === 'student') {
      if (!formData.currentYear.trim()) newErrors.currentYear = 'Current year is required';
      if (!formData.careerGoal.trim()) newErrors.careerGoal = 'Career goal is required';
      if (!formData.mentorshipType.trim()) newErrors.mentorshipType = 'Mentorship type is required';
      if (!formData.targetIndustry.trim()) newErrors.targetIndustry = 'Target industry is required';
    }

    // Alumni-only required fields
    if (userRole === 'alumni') {
      if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
      if (!formData.company.trim()) newErrors.company = 'Company is required';
      if (!formData.yearsExperience.trim()) newErrors.yearsExperience = 'Years of experience is required';
      if (!formData.mentorshipAreas.trim()) newErrors.mentorshipAreas = 'Mentorship areas are required';
      if (!formData.availability.trim()) newErrors.availability = 'Availability is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Build profile object
    const profile = {
      // Common fields
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || null,
      education: formData.education,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      domain: formData.domain,
      aboutMe: formData.aboutMe || null,
      role: userRole
    };

    // Add role-specific fields
    if (userRole === 'student') {
      profile.currentYear = formData.currentYear;
      profile.careerGoal = formData.careerGoal;
      profile.mentorshipType = formData.mentorshipType;
      profile.targetIndustry = formData.targetIndustry;
    } else if (userRole === 'alumni') {
      profile.jobTitle = formData.jobTitle;
      profile.company = formData.company;
      profile.yearsExperience = parseInt(formData.yearsExperience);
      profile.mentorshipAreas = formData.mentorshipAreas.split(',').map(s => s.trim()).filter(s => s);
      profile.availability = parseInt(formData.availability);
    }

    console.log('Profile Data:', profile);
  };

  const isFormValid = () => {
    const requiredFields = [
      'fullName', 'email', 'education', 'skills', 'domain'
    ];

    if (userRole === 'student') {
      requiredFields.push('currentYear', 'careerGoal', 'mentorshipType', 'targetIndustry');
    } else if (userRole === 'alumni') {
      requiredFields.push('jobTitle', 'company', 'yearsExperience', 'mentorshipAreas', 'availability');
    }

    return requiredFields.every(field => formData[field]?.trim());
  };

  return (
    <div className="profile-setup-page">
      <div className="profile-setup-container">
        <div className="profile-setup-card">
          <div className="profile-header">
            <h1 className="profile-title">Complete Your Profile</h1>
            <p className="profile-subtitle">
              Upload your resume to auto-fill details or enter them manually.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            {/* Resume Upload */}
            <div className="form-group">
              <label htmlFor="resume" className="form-label">
                Upload Resume (Optional)
              </label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="file-input"
                />
                <label htmlFor="resume" className="file-upload-label">
                  {isResumeUploaded ? (
                    <span className="file-uploaded">
                      ✓ {resumeFile?.name || 'Resume uploaded'}
                    </span>
                  ) : (
                    <span className="file-upload-placeholder">
                      Choose PDF file or drag and drop
                    </span>
                  )}
                </label>
              </div>
              {errors.resume && <span className="error-message">{errors.resume}</span>}
            </div>

            {/* Common Fields */}
            <div className="form-section">
              <h2 className="section-title">Basic Information</h2>
              
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="education" className="form-label">
                  Education / Degree <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className={`form-input ${errors.education ? 'input-error' : ''}`}
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
                {errors.education && <span className="error-message">{errors.education}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="skills" className="form-label">
                  Skills <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className={`form-input ${errors.skills ? 'input-error' : ''}`}
                  placeholder="e.g., JavaScript, React, Node.js (comma separated)"
                />
                {errors.skills && <span className="error-message">{errors.skills}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="domain" className="form-label">
                  Domain / Interest Area <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className={`form-input ${errors.domain ? 'input-error' : ''}`}
                  placeholder="e.g., Software Development, Data Science"
                />
                {errors.domain && <span className="error-message">{errors.domain}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="aboutMe" className="form-label">About Me</label>
                <textarea
                  id="aboutMe"
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Student-Only Fields */}
            {userRole === 'student' && (
              <div className="form-section">
                <h2 className="section-title">Student Information</h2>
                
                <div className="form-group">
                  <label htmlFor="currentYear" className="form-label">
                    Current Year of Study <span className="required">*</span>
                  </label>
                  <select
                    id="currentYear"
                    name="currentYear"
                    value={formData.currentYear}
                    onChange={handleChange}
                    className={`form-input ${errors.currentYear ? 'input-error' : ''}`}
                  >
                    <option value="">Select year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                  {errors.currentYear && <span className="error-message">{errors.currentYear}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="careerGoal" className="form-label">
                    Career Goal <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="careerGoal"
                    name="careerGoal"
                    value={formData.careerGoal}
                    onChange={handleChange}
                    className={`form-input ${errors.careerGoal ? 'input-error' : ''}`}
                    placeholder="e.g., Software Engineer, Data Scientist"
                  />
                  {errors.careerGoal && <span className="error-message">{errors.careerGoal}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="mentorshipType" className="form-label">
                    Interested Mentorship Type <span className="required">*</span>
                  </label>
                  <select
                    id="mentorshipType"
                    name="mentorshipType"
                    value={formData.mentorshipType}
                    onChange={handleChange}
                    className={`form-input ${errors.mentorshipType ? 'input-error' : ''}`}
                  >
                    <option value="">Select type</option>
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Technical Skills">Technical Skills</option>
                    <option value="Interview Preparation">Interview Preparation</option>
                    <option value="Industry Insights">Industry Insights</option>
                    <option value="All of the above">All of the above</option>
                  </select>
                  {errors.mentorshipType && <span className="error-message">{errors.mentorshipType}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="targetIndustry" className="form-label">
                    Target Industry / Domain <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="targetIndustry"
                    name="targetIndustry"
                    value={formData.targetIndustry}
                    onChange={handleChange}
                    className={`form-input ${errors.targetIndustry ? 'input-error' : ''}`}
                    placeholder="e.g., Technology, Finance, Healthcare"
                  />
                  {errors.targetIndustry && <span className="error-message">{errors.targetIndustry}</span>}
                </div>
              </div>
            )}

            {/* Alumni-Only Fields */}
            {userRole === 'alumni' && (
              <div className="form-section">
                <h2 className="section-title">Professional Information</h2>
                
                <div className="form-group">
                  <label htmlFor="jobTitle" className="form-label">
                    Current Job Title <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className={`form-input ${errors.jobTitle ? 'input-error' : ''}`}
                    placeholder="e.g., Senior Software Engineer"
                  />
                  {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    Company / Organization <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`form-input ${errors.company ? 'input-error' : ''}`}
                    placeholder="Enter company name"
                  />
                  {errors.company && <span className="error-message">{errors.company}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="yearsExperience" className="form-label">
                    Years of Experience <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="yearsExperience"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleChange}
                    className={`form-input ${errors.yearsExperience ? 'input-error' : ''}`}
                    placeholder="e.g., 5"
                    min="0"
                  />
                  {errors.yearsExperience && <span className="error-message">{errors.yearsExperience}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="mentorshipAreas" className="form-label">
                    Mentorship Areas <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="mentorshipAreas"
                    name="mentorshipAreas"
                    value={formData.mentorshipAreas}
                    onChange={handleChange}
                    className={`form-input ${errors.mentorshipAreas ? 'input-error' : ''}`}
                    placeholder="e.g., Career Guidance, Technical Skills (comma separated)"
                  />
                  {errors.mentorshipAreas && <span className="error-message">{errors.mentorshipAreas}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="availability" className="form-label">
                    Availability (hours/week) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className={`form-input ${errors.availability ? 'input-error' : ''}`}
                    placeholder="e.g., 5"
                    min="1"
                    max="40"
                  />
                  {errors.availability && <span className="error-message">{errors.availability}</span>}
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className={`submit-button ${!isFormValid() ? 'button-disabled' : ''}`}
              disabled={!isFormValid()}
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup;
