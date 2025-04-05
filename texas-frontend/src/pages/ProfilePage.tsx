import React, { useState, useEffect } from 'react';
import { ProfileForm } from './ProfileForm';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profiles, setProfiles] = useState({
    leetcode: '',
    codeforces: '',
    codechef: '',
  });

  useEffect(() => {
    const savedProfiles = localStorage.getItem("userProfiles");
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  }, []);

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // Refresh profiles from localStorage
    const savedProfiles = localStorage.getItem("userProfiles");
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto mt-10">
      {!isEditing ? (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Coding Profiles</h1>
          </div>
          
          <div className="space-y-4">
            {Object.entries(profiles).map(([platform, username]) => (
              <div key={platform} className="flex justify-between items-center border-b pb-3">
                <span className="font-medium capitalize">{platform}:</span>
                <span>{username || 'Not set'}</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            Edit Profiles
          </button>
        </div>
      ) : (
        <ProfileForm 
          initialData={profiles} 
          onProfileSubmit={handleProfileUpdate} 
        />
      )}
    </div>
  );
}
