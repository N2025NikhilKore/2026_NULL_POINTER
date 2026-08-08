import { useState } from "react";

export default function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Login button clicked");

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter email and password.");
      return;
    }

    setError("");

    // Move to Dashboard
    onLogin();
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          💧
        </div>

        <h1>
          AquaGuard AI
        </h1>

        <p className="login-subtitle">
          Smart Water Leak Detection
        </p>


        <form onSubmit={handleSubmit}>

          <label>
            Administrator Email
          </label>

          <input
            type="email"
            placeholder="admin@aquaguard.ai"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          {error && (
            <p className="login-error">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="login-button"
          >
            Login to Dashboard
          </button>

        </form>


        <div className="login-footer">
          AI + IoT Water Monitoring System
        </div>

      </div>

    </div>
  );
}