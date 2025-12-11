// import React, { useState } from "react";
// import { FaStar } from "react-icons/fa";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// import { toast } from "react-toastify";
// import { imageUpload } from "../../../Utils"; // your upload helper
// // import LessonCard from "../../Home/LessonCard"; // adjust path if needed

// const Profile = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const [displayName, setDisplayName] = useState(user?.displayName || "");
//   const [photoFile, setPhotoFile] = useState(null);
//   const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

//   // Fetch user profile info (total lessons & saved)
//   const { data: userProfile } = useQuery({
//     queryKey: ["user-profile", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${user.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   // Handle profile update
//   const handleProfileUpdate = async () => {
//     try {
//       let updatedPhotoURL = photoURL;

//       // If new photo selected, upload it
//       if (photoFile) {
//         updatedPhotoURL = await imageUpload(photoFile);
//         setPhotoURL(updatedPhotoURL);
//       }

//       const res = await axiosSecure.put(`/users/${user.email}`, {
//         displayName,
//         photoURL: updatedPhotoURL,
//       });

//       if (res.data.success) {
//         toast.success("Profile updated successfully!");
//       } else {
//         toast.error("Failed to update profile");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update profile");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-8">
//       {/* Profile Card */}
//       <div className="card bg-base-100 shadow-md p-6 rounded-xl">
//         <div className="flex items-center gap-6">
//           <div className="avatar">
//             <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//               <img src={photoURL} alt="Profile" />
//             </div>
//           </div>

//           <div className="space-y-2 flex-1">
//             <h2 className="text-2xl font-semibold flex items-center gap-2">
//               {displayName}
//               {userProfile?.role === "Premium" && (
//                 <span className="badge badge-warning gap-2 text-sm px-3 py-1">
//                   <FaStar /> Premium
//                 </span>
//               )}
//             </h2>
//             <p className="text-gray-500">{user.email}</p>

//             {/* Stats */}
//             <div className="flex gap-6 mt-3">
//               <div className="stat bg-base-200 rounded-xl p-3 w-40 text-center">
//                 <div className="stat-title">Lessons Created</div>
//                 <div className="stat-value text-primary text-3xl">
//                   {userProfile?.totalLessons || 0}
//                 </div>
//               </div>

//               <div className="stat bg-base-200 rounded-xl p-3 w-40 text-center">
//                 <div className="stat-title">Saved Lessons</div>
//                 <div className="stat-value text-secondary text-3xl">
//                   {userProfile?.totalFavorites || 0}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Update Profile */}
//       <div className="card bg-base-100 shadow-md p-6 rounded-xl">
//         <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

//         <form
//           className="space-y-4"
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleProfileUpdate();
//           }}
//         >
//           <div>
//             <label className="label">
//               <span className="label-text">Display Name</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Your name"
//               className="input input-bordered w-full"
//               value={displayName}
//               onChange={(e) => setDisplayName(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="label">
//               <span className="label-text">Update Photo</span>
//             </label>
//             <input
//               type="file"
//               className="file-input file-input-bordered w-full"
//               accept="image/*"
//               onChange={(e) => setPhotoFile(e.target.files[0])}
//             />
//           </div>

//           <button className="btn btn-primary w-full">Save Changes</button>
//         </form>
//       </div>

//       {/* Public Lessons Grid */}
//       {/* <div>
//         <h3 className="text-xl font-semibold mb-4">
//           Public Lessons by {displayName}
//         </h3>

//         {lessons.length === 0 ? (
//           <p className="text-gray-500 text-center py-10">
//             No public lessons found.
//           </p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {lessons.map((lesson) => (
//               <LessonCard key={lesson._id} lesson={lesson} />
//             ))}
//           </div>
//         )}
//       </div> */}
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
import { toast } from "react-toastify";
import { imageUpload } from "../../../Utils";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch user profile stats
  const { data: userProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch user's public lessons with sort
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

  if (loadingProfile || loadingLessons) return <LoadingSpinner />;

  const { lessons = [], totalLessons = 0 } = lessonsData;

  // Profile update handler
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

      if (res.data.success) toast.success("Profile updated successfully!");
      else toast.error("Failed to update profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Profile Card */}
      <div className="card bg-base-100 shadow-md p-6 rounded-xl">
        <div className="flex items-center gap-6">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={photoURL} alt="Profile" />
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              {displayName}
              {userProfile?.role === "Premium" && (
                <span className="badge badge-warning gap-2 text-sm px-3 py-1">
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
                  {totalLessons}
                </div>
              </div>

              <div className="stat bg-base-200 rounded-xl p-3 w-40 text-center">
                <div className="stat-title">Saved Lessons</div>
                <div className="stat-value text-secondary text-3xl">
                  {userProfile?.totalFavorites || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile */}
      <div className="card bg-base-100 shadow-md p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleProfileUpdate();
          }}
        >
          <div>
            <label className="label">
              <span className="label-text">Display Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Update Photo</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
            />
          </div>

          <button className="btn btn-primary w-full">Save Changes</button>
        </form>
      </div>

      {/* Sort buttons */}
      <div className="flex gap-4">
        <button
          className={`btn btn-outline btn-sm ${
            sortBy === "newest" && "btn-active"
          }`}
          onClick={() => setSortBy("newest")}
        >
          Newest
        </button>
        <button
          className={`btn btn-outline btn-sm ${
            sortBy === "popular" && "btn-active"
          }`}
          onClick={() => setSortBy("popular")}
        >
          Most Popular
        </button>
      </div>

      {/* Public Lessons Grid */}
      {lessons.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No public lessons found.
        </p>
      ) : (
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
                  Created: {new Date(lesson.createdAt).toLocaleDateString()}
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
      )}
    </div>
  );
};

export default Profile;
