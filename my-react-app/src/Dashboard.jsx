import { useState, useEffect } from "react";

function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // runs once on mount
    fetch("https://jsonplaceholder.typicode.com/users/1").then((res) =>
      res.json().then((data) => setUser(data))
    );
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
