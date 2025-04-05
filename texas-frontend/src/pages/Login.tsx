// src/pages/Login.jsx
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Code2 } from "lucide-react";

export function Login({ onLoginSuccess }) {
  const CLIENT_ID = "280722919558-6f4hetih0q559jlndmmehj1c3i443vui.apps.googleusercontent.com";
  
  const handleGoogleSignIn = (credentialResponse) => {
    console.log("Google Sign-in successful", credentialResponse);
    onLoginSuccess(credentialResponse);
  };

  const handleFailure = (error) => {
    console.error("Google Sign-in failed", error);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4">
              <Code2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                CodeBuddy
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              🚀 Chart Your Growth 📈
            </p>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Sign in to continue
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              Access your dashboard and track your coding progress
            </p>
          </div>

          <div className="flex justify-center">
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleSignIn}
                onError={handleFailure}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
