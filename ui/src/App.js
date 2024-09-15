// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import AddProblemForm from "./AddProblemForm";
import TestCreator from "./TestCreator";
import Tests from "./Tests";

function App() {
  const [userType, setUserType] = useState("teacher");
  const [userId, setUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://eval-rose.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: userType,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to login. Status: ${response.status}`);
      }

      const data = await response.json();

      if (data === "true") {
        setLoggedIn(true);
      } else {
        alert("Not Authorized");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType("teacher");
    setUserId("");
  };

  return (
    <Router>
      <div className="App">
        <Header />

        {!loggedIn ? (
          <div>
            <div>
              <label>
                <input
                  type="radio"
                  value="teacher"
                  checked={userType === "teacher"}
                  onChange={handleUserTypeChange}
                />
                Teacher
              </label>
              <label>
                <input
                  type="radio"
                  value="student"
                  checked={userType === "student"}
                  onChange={handleUserTypeChange}
                />
                Student
              </label>
            </div>
            <div>
              <label htmlFor="userId">Enter ID:</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={userId}
                onChange={handleUserIdChange}
              />
            </div>
            <button onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <div>
            <h2>Welcome {userType}</h2>
            <button onClick={handleLogout}>Log Out</button>
            <Routes>
              <Route path="/add-problem" element={<AddProblemForm />} />
              <Route path="/test-creator" element={<TestCreator />} />
              <Route
                path="/tests"
                element={<Tests userId={userId} />} // Pass userId as a prop
              />
            </Routes>
            {/* Add any other content or components for the logged-in user */}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
