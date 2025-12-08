import React from "react";
import { FaStar } from "react-icons/fa";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    photo: "https://i.pravatar.cc/150?img=12",
    premium: true,
    created: 12,
    saved: 5,
  };

  const lessons = [
    {
      _id: 1,
      title: "How to stay focused in life",
      image: "https://placehold.co/600x400",
      createdAt: "2025-01-02",
    },
    {
      _id: 2,
      title: "Why discipline beats motivation",
      image: "https://placehold.co/600x400",
      createdAt: "2025-02-10",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Profile Card */}
      <div className="card bg-base-100 shadow-md p-6 rounded-xl">
        <div className="flex items-center gap-6">
          {/* Profile Photo */}
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.photo} alt="Profile" />
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              {user.name}
              {user.premium && (
                <span className="badge badge-warning gap-2 text-sm px-3 py-3">
                  <FaStar /> Premium
                </span>
              )}
            </h2>
            <p className="text-gray-500">{user.email}</p>

            {/* Stats */}
            <div className="flex gap-6 mt-3">
              <div className="stat bg-base-200 rounded-xl p-3 w-40 text-center">
                <div className="stat-title">Lessons Created</div>
                <div className="stat-value text-primary text-3xl">
                  {user.created}
                </div>
              </div>

              <div className="stat bg-base-200 rounded-xl p-3 w-40 text-center">
                <div className="stat-title">Saved Lessons</div>
                <div className="stat-value text-secondary text-3xl">
                  {user.saved}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Section */}
      <div className="card bg-base-100 shadow-md p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Display Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full"
              defaultValue={user.name}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Update Photo</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <button className="btn btn-primary w-full">Save Changes</button>
        </form>
      </div>

      {/* Public Lessons Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Public Lessons by {user.name}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="card bg-base-100 shadow-md rounded-xl hover:shadow-lg transition"
            >
              <figure>
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="h-40 w-full object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{lesson.title}</h2>
                <p className="text-gray-500 text-sm">
                  Created: {lesson.createdAt}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-outline btn-primary btn-sm">
                    View Lesson
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* If no lessons */}
        {lessons.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            No public lessons found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
