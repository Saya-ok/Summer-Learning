import { useState } from "react";

function LoginForm({ onLogin }) {
  const [loginMessage, setLoginMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (username === "Ali" && password === "123") {
      setLoginMessage(`Welcome back! ${username}!`);
      onLogin();
    } else {
      setLoginMessage("Invalid credentials.");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit">Login</button>
      </form>
      <p>{loginMessage}</p>
    </div>
  );
}

export default LoginForm;
