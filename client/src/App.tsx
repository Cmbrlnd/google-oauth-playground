import { useState, useEffect } from "react";
import axios from "axios";
import GoogleLoginButton from "./components/GoogleLoginButton"; // Import the new component
import "./App.css";

import { getLocalData } from "./functions/getLocalData";

function App() {
  const [givenName, setGivenName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const localData = getLocalData();

    if (localData) {
      const [token, name] = localData;

      const apiUrl = "http://localhost:5000/checkAuth";
      axios
        .get(apiUrl, { headers: { Authorization: token } })
        .then((_) => {
          setLoggedIn(true);
          setGivenName(name);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoggedIn(false);
          setGivenName("");
          localStorage.clear();
        });
    } else {
      setLoggedIn(false);
      setGivenName("");
    }
  }, [loggedIn]);

  // Successful response from Google oAuth handler
  const handleGoogleLoginSuccess = (name: string, _: string) => {
    setGivenName(name);
    setLoggedIn(true);
  };

  // Logout function
  const handleLogout = async () => {
    const emptyToken = localStorage.removeItem("accessToken");
    localStorage.removeItem("givenName");
    setGivenName("");

    const logoutRes = await axios.post(
      "http://localhost:5000/logout",
      emptyToken
    );

    // Update Logged in value in UI
    if (logoutRes.status === 200) {
      setLoggedIn(false);
    }
  };

  // Send JWT to backend to be verified, receive name from payload back
  const handleCheckSession = async () => {
    const apiUrl = "http://localhost:5000/checkAuth";
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios
        .get(apiUrl, { headers: { Authorization: token } })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error(
            "Error fetching user data, JWT most likely failed to be verified.",
            error
          );
          localStorage.clear();
          setGivenName("");
          setLoggedIn(false);
        });
    }
  };

  // Send JWT to backend to be decoded and sent to Google for refreshing access token
  const handleRefreshGoogleToken = async () => {
    const apiUrl = "http://localhost:5000/auth/google-refresh-token";
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios
        .get(apiUrl, { headers: { Authorization: token } })
        .then((res) => {
          console.log(res.data.message);
          // Update localStorage JWT with refreshed Google tokens
          localStorage.setItem("accessToken", res.data.accessToken);
        })
        .catch((err) => {
          console.error("Error refreshing Google access token", err);
          localStorage.clear();
          setGivenName("");
          setLoggedIn(false);
        });
    }
  };

  return (
    <>
      <div className="main">
        <div>
          <p className="infoDiv">Logged in: {loggedIn.toString()}</p>
          {givenName && <p className="infoDiv">Welcome, {givenName}!</p>}
        </div>
        <div>
          {loggedIn && (
            <button onClick={handleCheckSession}>Check JWT Token</button>
          )}
          {loggedIn && (
            <button onClick={handleRefreshGoogleToken}>
              Refresh Google access token
            </button>
          )}
          {loggedIn && <button onClick={handleLogout}>Logout</button>}
          {!loggedIn && (
            <GoogleLoginButton onSuccess={handleGoogleLoginSuccess} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;