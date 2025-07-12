const appDiv = document.getElementById("app");

function renderLoading() {
  appDiv.innerHTML = `<h2>Loading...</h2>`;
}

function renderLoginForm() {
  appDiv.innerHTML = `
  <h2>Login</h2>
    <form id="loginForm">
      <input type="text" id="username" placeholder="Username" required /><br/>
      <input type="password" id="password" placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
  `;

  document.getElementById("loginForm").addEventListener("submit", handleLogin);
}

function renderDashboard(user) {
  appDiv.innerHTML = `
  <div style="background: #eee; padding: 10px; border-radius: 8px; margin-bottom: 10px;">
      Logged in as <strong>${user ? user.username : "Unknown"}</strong>
    </div>
    <h2>Welcome back!</h2>
    <p>Name: ${user ? user.name : "N/A"}</p>
    <p>Email: ${user ? user.email : "N/A"}</p>
    <button id="logout">Logout</button>
  `;

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    renderLoginForm();
  });
}

async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const token = await fakeLoginApi(username, password);
    localStorage.setItem("token", token);

    const user = await getUserProfile();

    renderDashboard(user);
  } catch (error) {
    alert("Login failed:" + error);
  }

  console.log("Attempt login with:", username, password);
}

async function fakeLoginApi(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "Ali" && password === "123") {
        resolve("FAKE_TOKEN_123");
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000); // Simulate 1 second network delay
  });
}

async function getUserProfile() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    if (!response.ok) {
      throw new Error("Network error");
    }

    const user = await response.json();
    return user;
  } catch (errror) {
    console.error("Failed to fetch user:", user);
    return null;
  }
}

if (localStorage.getItem("token")) {
  renderLoading();
  getUserProfile().then((user) => {
    renderDashboard(user);
  });
} else {
  renderLoginForm();
}
