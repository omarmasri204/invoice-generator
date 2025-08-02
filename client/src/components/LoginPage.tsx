import React, { useState } from "react";

const USERNAME = "Omar";
const PASSWORD = "Omar-2004";

type Props = {
  onLogin: () => void;
};

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      onLogin();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
        </div>
        <div style={{ marginTop: 10 }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
        </div>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        <button type="submit" style={{ marginTop: 15, width: "100%" }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;