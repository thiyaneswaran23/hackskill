import { useState, useEffect } from "react";
import "./CareerResources.css";

function CareerResources() {
  const [filter, setFilter] = useState("all");
  const [isAlumni, setIsAlumni] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setIsAlumni(user.role === "alumni");
    }
  }, []);

  // Mock data (replace with API later)
  const resources = [
    {
      id: 1,
      title: "Frontend Interview Preparation Guide",
      description:
        "A structured roadmap covering JavaScript, React, and interview patterns.",
      type: "resource",
      postedBy: "Ramesh Kumar (Alumni)",
      link: "#",
    },
    {
      id: 2,
      title: "Software Engineer Intern – Summer 2026",
      description:
        "Internship opportunity for students with DSA and React basics.",
      type: "internship",
      postedBy: "Priya Sharma (Alumni)",
      link: "#",
    },
    {
      id: 3,
      title: "Junior Backend Developer – Node.js",
      description:
        "Full-time role for freshers skilled in Node.js, MongoDB, and REST APIs.",
      type: "job",
      postedBy: "Arjun Mehta (Alumni)",
      link: "#",
    },
  ];

  const filteredResources =
    filter === "all"
      ? resources
      : resources.filter((item) => item.type === filter);

  return (
    <div className="career-page">
      <div className="career-container">
        {/* Header */}
        <div className="career-header">
          <div>
            <h1 className="career-title">Career Resources</h1>
            <p className="career-subtitle">
              Alumni-shared resources, job openings, and internships to support
              student career growth.
            </p>
          </div>

          {/* Alumni-only Post Button */}
          {isAlumni && (
            <button className="post-btn">
              + Post Opportunity
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="career-filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
          style={{ color: "#000" }}
            className={filter === "resource" ? "active" : ""}
            onClick={() => setFilter("resource")}
          >
            Resources
          </button>
          <button
          style={{ color: "#000" }}
            className={filter === "job" ? "active" : ""}
            onClick={() => setFilter("job")}
          >
            Jobs
          </button>
          <button
          style={{ color: "#000" }}
            className={filter === "internship" ? "active" : ""}
            onClick={() => setFilter("internship")}
          >
            Internships
          </button>
        </div>

        {/* Cards */}
        <div className="resource-grid">
          {filteredResources.map((item) => (
            <div key={item.id} className="resource-card">
              <span className={`badge ${item.type}`}>
                {item.type.toUpperCase()}
              </span>

              <h3 className="resource-title">{item.title}</h3>
              <p className="resource-description">{item.description}</p>

              <div className="resource-footer">
                <span className="posted-by">{item.postedBy}</span>
                <a href={item.link} className="view-btn">
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CareerResources;
