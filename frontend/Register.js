import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("https://localhost:7140/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.text();

      if (!response.ok) {
        setError(data);
      } else {
        setMessage(data);
        setFormData({ username: "", password: "" });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundImage: `url('/images/login-bg.jpg')`, // same background as login
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Left Welcome Panel */}
      <div style={{ flex: 1, padding: '100px', color: '#000' }}>
        <h1 style={{ fontSize: '3rem' }}>Join Us At</h1>
        <h1 style={{ fontSize: '3rem' }}>
          🛒 Ecommerce <br /> Application
        </h1>
        <p style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '1.1rem' }}>
          Create your account today<br />
          <span style={{ fontWeight: 'normal' }}>
            and unlock the best shopping experience.
          </span>
        </p>
      </div>

      {/* Right Registration Card */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#f9c7a4",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            width: "320px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>REGISTER</h2>

          <div style={{ textAlign: "left", marginBottom: "15px" }}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#3b60ab",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            Register
          </button>

          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <p style={{ marginTop: "10px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#0645AD" }}>
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
