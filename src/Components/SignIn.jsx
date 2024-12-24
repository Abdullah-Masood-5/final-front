import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/SignIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        formData
      );

      // Store token and role in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); // assuming the role is returned from the API

      setMessage("Login successful");

      window.location.reload(); // Reload the page after successful login
      // Redirect user based on role
      if (res.data.role === "Host") {
        navigate("/hostdashboard"); // Redirect to Host Dashboard if role is Host
        window.reload();
      } else {
        navigate("/profile"); // Redirect to homepage or Guest dashboard
        window.reload();
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-image">
        <img src="./SignIn.jpeg" alt="SignIn Illustration" />
      </div>

      <div className="signin-form-container">
        <form onSubmit={handleSubmit} className="signin-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            className="signin-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            className="signin-input"
          />
          <button type="submit" className="signin-button">
            Sign In
          </button>
          <p className="signin-message">{message}</p>
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
