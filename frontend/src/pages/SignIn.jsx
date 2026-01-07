import { useState } from 'react';
import './SignIn.css';
import axios from "axios";
function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Student'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email: formData.email,
          password: formData.password
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Signin successful");
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data?.message || "Signin failed");
    }
  };


  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-card">
          <h1 className="signin-title">Welcome Back</h1>
          
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="role-select"
              >
                <option value="Student">Student</option>
                <option value="Alumni">Alumni</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>

          <p className="signin-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
