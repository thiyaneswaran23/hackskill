import { useState } from "react";
import "./SignIn.css";
import axios from "axios";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

      const { token, user } = res.data;

      // 🔥 Store exactly what Dashboard expects
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

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
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
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
