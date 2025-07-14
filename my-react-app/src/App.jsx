import { useState, useEffect } from "react";
import LoginForm from "./LoginForm.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === true;
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setMessage("✅ You have been logged out!");
  }

  return (
    <>
      <h1>Welcome to My React App!</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginForm
          onLogin={() => {
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
            setMessage("");
          }}
        />
      )}
    </>
  );
}

export default App;
