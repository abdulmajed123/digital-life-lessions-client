import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
import { toast } from "react-toastify";
import { imageUpload } from "../../../Utils";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [displayName, setDisplayName] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const { data: userProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: lessonsData = {}, isLoading: loadingLessons } = useQuery({
    queryKey: ["my-lessons", user?.email, sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-lessons/${user.email}?sortBy=${sortBy}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (!user || loadingProfile || loadingLessons) return <LoadingSpinner />;

  const { lessons = [], totalLessons = 0 } = lessonsData;

  const handleProfileUpdate = async () => {
    try {
      let updatedPhotoURL = photoURL;

      if (photoFile) {
        updatedPhotoURL = await imageUpload(photoFile);
        setPhotoURL(updatedPhotoURL);
      }

      const res = await axiosSecure.put(`/users/${user.email}`, {
        displayName,
        photoURL: updatedPhotoURL,
      });

      res.data.success;
      //   ? toast.success("Profile updated successfully!")
      //   : toast.error("Failed to update profile");
    } catch (err) {
      console.log(err);
      // toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Profile Card */}
      <div className="card bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 border dark:border-gray-700">
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 dark:ring-offset-gray-800 ring-offset-2">
            <img src={photoURL} alt="Profile" />
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
            {displayName}
            {userProfile?.role === "Premium" && (
              <span className="badge badge-warning gap-2">
                <FaStar /> Premium
              </span>
            )}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>

          <div className="flex flex-wrap gap-4 mt-3">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 w-40 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Lessons Created
              </p>
              <p className="text-3xl font-bold text-primary">{totalLessons}</p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 w-40 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Saved Lessons
              </p>
              <p className="text-3xl font-bold text-secondary">
                {userProfile?.totalFavorites || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile */}
      <div className="card bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl border dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Update Profile
        </h3>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleProfileUpdate();
          }}
        >
          <input
            type="text"
            className="input input-bordered w-full bg-white dark:bg-gray-700 dark:text-white"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <input
            type="file"
            className="file-input file-input-bordered w-full bg-white dark:bg-gray-700 dark:text-white"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
          />

          <button className="btn btn-primary w-full">Save Changes</button>
        </form>
      </div>

      {/* Sort */}
      <div className="flex gap-4">
        {["newest", "popular"].map((type) => (
          <button
            key={type}
            className={`btn btn-outline btn-sm ${
              sortBy === type && "btn-active"
            }`}
            onClick={() => setSortBy(type)}
          >
            {type === "newest" ? "Newest" : "Most Popular"}
          </button>
        ))}
      </div>

      {/* Lessons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="card bg-white dark:bg-gray-800 shadow-md rounded-xl border dark:border-gray-700"
          >
            <img
              src={lesson.image}
              className="h-40 w-full object-cover rounded-t-xl"
            />
            <div className="card-body">
              <h2 className="card-title text-gray-800 dark:text-white">
                {lesson.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lesson.category}
              </p>
              <Link
                to={`/lesson/${lesson._id}`}
                className="btn btn-outline btn-primary btn-sm mt-2"
              >
                View Lesson
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
