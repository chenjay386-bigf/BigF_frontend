import React, { useState } from "react";

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !username)) {
      alert("Please fill in all required fields!");
      return;
    }

    setLoading(true);

    // Simulated API authentication call (Flask backend connection point)
    setTimeout(() => {
      setLoading(false);
      alert(`🎉 Successfully ${isLogin ? "logged in" : "registered"} as ${email}!`);
      if (onLoginSuccess) {
        onLoginSuccess({ email, username: username || email.split("@")[0] });
      }
    }, 1000);
  };

  return (
    <div
      style={{
        backgroundColor: "#064e3b",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#1e293b",
          maxWidth: "400px",
          width: "100%",
          padding: "32px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Brand Logo Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#2e7d32",
              color: "#ffffff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "24px",
              margin: "0 auto 10px auto",
            }}
          >
            F
          </div>
          <h2 style={{ margin: 0, color: "#1b5e20", fontSize: "22px" }}>
            BIG F COMMUNITY
          </h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>
            {isLogin ? "Welcome back! Slurp into your account." : "Join Kenya's biggest noodle community!"}
          </p>
        </div>

        {/* Tab Switcher: Login / Register */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#e8f5e9",
            borderRadius: "25px",
            padding: "4px",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "13px",
              backgroundColor: isLogin ? "#2e7d32" : "transparent",
              color: isLogin ? "#ffffff" : "#2e7d32",
              transition: "all 0.2s",
            }}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "13px",
              backgroundColor: !isLogin ? "#2e7d32" : "transparent",
              color: !isLogin ? "#ffffff" : "#2e7d32",
              transition: "all 0.2s",
            }}
          >
            Register
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {!isLogin && (
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px", color: "#334155" }}>
                Username
              </label>
              <input
                type="text"
                placeholder="e.g. NoodleMaster99"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #c8e6c9",
                  boxSizing: "border-box",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px", color: "#334155" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="chef@bigf.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #c8e6c9",
                boxSizing: "border-box",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px", color: "#334155" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #c8e6c9",
                boxSizing: "border-box",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          {isLogin && (
            <div style={{ textAlign: "right" }}>
              <span
                onClick={() => alert("Password reset link sent to your email!")}
                style={{ fontSize: "12px", color: "#2e7d32", cursor: "pointer", fontWeight: "600" }}
              >
                Forgot password?
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#2e7d32",
              color: "#ffffff",
              border: "none",
              padding: "14px",
              borderRadius: "25px",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "8px",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Processing..." : isLogin ? "Log In" : "Create Account"}
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#64748b" }}>
          {isLogin ? "Don't have an account? " : "Already registered? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "#2e7d32", fontWeight: "bold", cursor: "pointer" }}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </div>
      </div>
    </div>
  );
}