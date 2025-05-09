import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ResumeEditor from "./components/ResumeEditor";
import LoginScreen from "./LoginScreen";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("auth");
  return isLoggedIn ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <ResumeEditor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
