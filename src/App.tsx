import "./App.css";

import Navbar from "./Navbar/Navbar";
import AboutPage from "./Pages/ABoutPage";
import { Routes, Route } from "react-router";
import PageNotFound from "./Pages/PageNotFound";
import LoginPage from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Logout from "./Pages/Auth/Logout";
import Notification from "./components/Notification";
import HomePage from "./Pages/Home";

function App() {
  return (
    <>
      <div className="content-container">
        <Navbar />
        <Notification />
        <Routes>
          <Route index element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
