import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import { ProfileForm } from "./pages/ProfileForm";
import { ProfilePage } from "./pages/ProfilePage";
import { MainPage } from "./pages/MainPage";
import { Problems } from "./pages/Problems";
import { Contests } from "./pages/Contests";
import { Login } from "./pages/Login";

import { Code2, Moon, Sun } from "lucide-react";
import { supabase } from "./lib/supabase";
import { ThemeProvider, useTheme } from "./lib/ThemeContext";

function AppContent() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfiles, setHasProfiles] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      // Check if user has profiles
      checkUserProfiles();
    }
  }, []);

  // Function to check if user has added profiles
  const checkUserProfiles = async () => {
    // You would implement this to check if the user has profiles
    // For example, using Supabase to query the profiles table
    try {
      // Example query - you'll need to adjust based on your data structure
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", "current-user-id"); // Replace with actual user ID retrieval

      if (error) throw error;

      // If profiles exist, set hasProfiles to true
      if (data && data.length > 0) {
        setHasProfiles(true);
        localStorage.setItem("hasProfiles", "true");
      } else {
        setHasProfiles(false);
        localStorage.setItem("hasProfiles", "false");
      }
    } catch (error) {
      console.error("Error checking profiles:", error);
      setHasProfiles(false);
    }
  };

  const handleLoginSuccess = (credentialResponse) => {
    setIsAuthenticated(true);
    localStorage.setItem("authToken", credentialResponse.credential);
    // After login, check if user has profiles
    checkUserProfiles();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("hasProfiles");
    setIsAuthenticated(false);
    setHasProfiles(false);
  };

  const handleProfileSubmit = () => {
    // This function would be called after successful profile submission
    setHasProfiles(true);
    localStorage.setItem("hasProfiles", "true");
    setActiveTab("Home");
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // If authenticated but no profiles, show profile form
  if (!hasProfiles) {
    return <ProfileForm onProfileSubmit={handleProfileSubmit} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div
              className="flex items-center"
              onClick={() => setActiveTab("Home")}
              style={{ cursor: "pointer" }}
            >
              <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                CodeBuddy
              </span>
            </div>

            <div className="flex space-x-4 items-center">
              {["Home", "Problems", "Contests", "Newsletter", "Profile"].map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`!text-gray-700 dark:!text-gray-300 ${
                    activeTab === tab ? "dark:!bg-gray-700 !bg-gray-200" : ""
                  }`}
                >
                  {tab}
                </Button>
              ))}
              <Button
                onClick={handleLogout}
                className="!ml-4 !bg-red-500 !text-white hover:!bg-red-600"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "Home" && <MainPage />}
        {activeTab === "Problems" && <Problems />}
        {activeTab === "Contests" && <Contests />}
        {activeTab === "Profile" && <ProfilePage />}
        {activeTab === "NewsLetter" && <NewsLetter />}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
