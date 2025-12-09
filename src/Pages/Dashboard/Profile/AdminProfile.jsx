// src/pages/AdminProfile.jsx
import React, { useState } from "react";
import {
  FaUserShield,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaTasks,
} from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  // --- Mock Data ---
  const initialProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@platform.com",
    role: "Super Administrator",
    photoUrl: "https://i.pravatar.cc/150?img=68", // Placeholder image
    lessonsModerated: 450,
    actionsTaken: 89,
  };
  // -----------------

  const [profile, setProfile] = useState(initialProfile);
  const [newName, setNewName] = useState(initialProfile.name);
  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameUpdate = (e) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    setProfile({ ...profile, name: newName });
    setIsEditingName(false);
    console.log(`Updated name to: ${newName}`);
  };

  const handlePhotoUpload = (e) => {
    // Simple file upload logic placeholder
    const file = e.target.files[0];
    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      setProfile({ ...profile, photoUrl: newPhotoUrl });
      console.log(`Updated photo URL: ${newPhotoUrl}`);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-primary">
        ⚙️ Admin Profile Settings
      </h1>
      <p className="text-base-content/70">
        Manage your profile details and administrative summary.
      </p>

      {/* Profile Card Container */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          {/* Profile Header (Photo, Name, Role) */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 pb-6 border-b border-base-200">
            {/* Photo Upload/Display */}
            <div className="avatar indicator">
              {/* Hidden file input triggered by button/photo click */}
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div
                className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer"
                onClick={() => document.getElementById("photo-upload").click()}
              >
                <img src={user.photoURL} alt={`${profile.name}'s profile`} />
              </div>
              <span
                className="indicator-item badge badge-sm badge-info cursor-pointer"
                onClick={() => document.getElementById("photo-upload").click()}
                title="Change Photo"
              >
                <FaEdit className="w-3 h-3" />
              </span>
            </div>

            {/* Name, Email, Role */}
            <div>
              {/* Name and Edit Button */}
              <div className="flex items-center space-x-2">
                {isEditingName ? (
                  <form onSubmit={handleNameUpdate} className="flex space-x-2">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="input input-bordered input-sm w-full max-w-xs"
                      required
                    />
                    <button type="submit" className="btn btn-success btn-sm">
                      <FaCheckCircle />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingName(false)}
                      className="btn btn-error btn-sm"
                    >
                      <FaTimesCircle />
                    </button>
                  </form>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{user.displayName}</h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="btn btn-ghost btn-sm text-primary"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              <p className="text-base-content/80 mt-1">{user.email}</p>

              {/* Admin Role Badge */}
              <div className="badge badge-lg badge-secondary mt-3 flex items-center space-x-1">
                <FaUserShield />
                <span>{profile.role}</span>
              </div>
            </div>
          </div>

          {/* Activity Summary (Optional but included for completeness) */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center text-accent">
              <FaTasks className="mr-2" /> Administrative Summary
            </h3>
            <div className="stats shadow w-full">
              <div className="stat bg-base-200">
                <div className="stat-title">Lessons Moderated</div>
                <div className="stat-value text-accent">
                  {profile.lessonsModerated}
                </div>
                <div className="stat-desc">Total reviews completed</div>
              </div>

              <div className="stat bg-base-200">
                <div className="stat-title">System Actions Taken</div>
                <div className="stat-value text-warning">
                  {profile.actionsTaken}
                </div>
                <div className="stat-desc">
                  Flags resolved, accounts managed
                </div>
              </div>
            </div>
          </div>

          {/* General Settings Placeholder */}
          <div className="mt-8 pt-4 border-t border-base-200">
            <h3 className="text-xl font-semibold mb-4">General Preferences</h3>
            <div className="form-control">
              <label className="label cursor-pointer justify-start space-x-4">
                <input
                  type="checkbox"
                  defaultChecked
                  className="toggle toggle-primary"
                />
                <span className="label-text">
                  Receive critical system alerts via email
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
