// import React from "react";
// import {
//   FaBook,
//   FaStar,
//   FaPlusCircle,
//   FaHeart,
//   FaCog,
//   FaQuestionCircle,
// } from "react-icons/fa";
// import { Link } from "react-router"; // Use Link for internal navigation
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";

// const UserDashboardHome = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: myLessons = {} } = useQuery({
//     queryKey: ["my-lessons", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/my-lessons/${user.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   const { data: favorites = [], isLoading } = useQuery({
//     queryKey: ["favorites", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/favorites/${user.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   if (isLoading) return <LoadingSpinner></LoadingSpinner>;
//   return (
//     <div className="space-y-8 p-4">
//       {/* 1. Welcome Header - Now handled in the Layout for consistency, but added here for context */}
//       <div className="pb-4">
//         <h1 className="text-3xl font-bold text-base-content">
//           👋 Welcome Back, Jane!
//         </h1>
//         <p className="text-base-content/70">
//           Here's a quick overview of your progress.
//         </p>
//       </div>

//       {/* 2. Main Metrics (Total Lessons, Favorites) using DaisyUI stats */}
//       <div className="stats shadow w-full border border-base-300 bg-base-100">
//         <div className="stat">
//           <div className="stat-figure text-primary">
//             <FaBook className="w-8 h-8" />
//           </div>
//           <div className="stat-title">Total Lessons Created</div>
//           <div className="stat-value text-primary">
//             {" "}
//             {myLessons.totalLessons}
//           </div>
//           <div className="stat-desc">Your personal library size</div>
//         </div>

//         <div className="stat">
//           <div className="stat-figure text-secondary">
//             <FaStar className="w-8 h-8" />
//           </div>
//           <div className="stat-title">Total Saved (Favorites)</div>
//           <div className="stat-value text-secondary">{favorites.length}</div>
//           <div className="stat-desc">Lessons bookmarked for later</div>
//         </div>

//         <div className="stat hidden sm:block">
//           <div className="stat-figure text-accent">
//             <FaPlusCircle className="w-8 h-8" />
//           </div>
//           <div className="stat-title">Monthly Contributions</div>
//           <div className="stat-value text-accent">7</div>
//           <div className="stat-desc">New lessons added this month</div>
//         </div>
//       </div>

//       {/* 3. Quick Shortcuts using Link and DaisyUI buttons/cards */}
//       <section className="space-y-4">
//         <h2 className="text-2xl font-semibold text-base-content">
//           ⚡ Quick Actions
//         </h2>
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           <Link
//             to="/create-lesson"
//             className="card bg-primary text-primary-content shadow-xl hover:shadow-2xl transition-shadow duration-300"
//           >
//             <div className="card-body p-4 md:p-6 text-center">
//               <FaPlusCircle className="w-8 h-8 mx-auto mb-2" />
//               <h3 className="text-lg font-bold">Create New Lesson</h3>
//             </div>
//           </Link>

//           <Link
//             to="/favorites"
//             className="card bg-secondary text-secondary-content shadow-xl hover:shadow-2xl transition-shadow duration-300"
//           >
//             <div className="card-body p-4 md:p-6 text-center">
//               <FaHeart className="w-8 h-8 mx-auto mb-2" />
//               <h3 className="text-lg font-bold">View My Favorites</h3>
//             </div>
//           </Link>

//           <Link
//             to="/settings"
//             className="card bg-neutral text-neutral-content shadow-xl hover:shadow-2xl transition-shadow duration-300"
//           >
//             <div className="card-body p-4 md:p-6 text-center">
//               <FaCog className="w-8 h-8 mx-auto mb-2" />
//               <h3 className="text-lg font-bold">Profile Settings</h3>
//             </div>
//           </Link>

//           <Link
//             to="/support"
//             className="card bg-info text-info-content shadow-xl hover:shadow-2xl transition-shadow duration-300"
//           >
//             <div className="card-body p-4 md:p-6 text-center">
//               <FaQuestionCircle className="w-8 h-8 mx-auto mb-2" />
//               <h3 className="text-lg font-bold">Get Help/Support</h3>
//             </div>
//           </Link>
//         </div>
//       </section>

//       {/* 4. Analytics Chart & Recently Added (Side-by-Side) */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Small Analytics Chart Card (Takes 2/3 width) */}
//         <div className="lg:col-span-2 card bg-base-100 shadow-xl border border-base-200">
//           <div className="card-body">
//             <h2 className="card-title text-xl font-semibold">
//               📈 Weekly Activity Reflection
//             </h2>

//             <div className="h-60 bg-base-200 rounded-lg flex items-center justify-around p-4 my-2">
//               <p className="text-base-content/60 italic hidden sm:block">
//                 Placeholder for Chart.js/Recharts integration
//               </p>

//               {/* Simple visual indicator for contribution/completion rate */}
//               <div
//                 className="radial-progress text-success"
//                 style={{
//                   "--value": 75,
//                   "--size": "8rem",
//                   "--thickness": "12px",
//                 }}
//                 role="progressbar"
//               >
//                 <span className="font-bold text-xl">75%</span>
//                 <span className="text-sm mt-1">Completion</span>
//               </div>
//             </div>

//             <div className="alert alert-info shadow-lg mt-4">
//               <div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   className="stroke-current flex-shrink-0 w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   ></path>
//                 </svg>
//                 <span>
//                   **Reflection:** You were highly active! You completed 9 study
//                   sessions and created 3 new lessons this week.
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recently Added Lessons Card (Takes 1/3 width) */}
//         <div className="lg:col-span-1 card bg-base-100 shadow-xl border border-base-200">
//           <div className="card-body">
//             <h2 className="card-title text-xl font-semibold">
//               🕒 Recently Added
//             </h2>
//             <ul className="space-y-3 mt-2 menu p-0">
//               <li className="hover:bg-base-200 rounded-md">
//                 <Link to="/lesson/101">Introduction to Quantum Physics</Link>
//               </li>
//               <li className="hover:bg-base-200 rounded-md">
//                 <Link to="/lesson/102">Advanced CSS Layouts (Flexbox)</Link>
//               </li>
//               <li className="hover:bg-base-200 rounded-md">
//                 <Link to="/lesson/103">The History of Renaissance Art</Link>
//               </li>
//               <li className="hover:bg-base-200 rounded-md">
//                 <Link to="/lesson/104">Financial Modeling Basics</Link>
//               </li>
//             </ul>
//             <div className="card-actions justify-end mt-4">
//               <Link
//                 to="/my-lessons"
//                 className="btn btn-sm btn-outline btn-primary"
//               >
//                 View All Lessons →
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboardHome;

import React from "react";
import {
  FaBook,
  FaStar,
  FaPlusCircle,
  FaHeart,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const UserDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // My Lessons
  const { data: myLessonsData = {}, isLoading: isLoadingLessons } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { lessons = [], totalLessons = 0 } = myLessonsData;

  // Favorites
  const { data: favorites = [], isLoading: isLoadingFav } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Weekly Analytics
  const { data: analytics = [] } = useQuery({
    queryKey: ["weekly-analytics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/weekly/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoadingLessons || isLoadingFav) return <LoadingSpinner />;

  // Prepare chart data
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const chartData = days.map((day, idx) => {
    const item = analytics.find((d) => d._id === idx + 1);
    return { day, count: item ? item.count : 0 };
  });

  return (
    <div className="space-y-8 p-4">
      {/* Welcome Header */}
      <div className="pb-4">
        <h1 className="text-3xl font-bold text-base-content">
          👋 Welcome Back, {user?.displayName || "User"}!
        </h1>
        <p className="text-base-content/70">
          Here's a quick overview of your progress.
        </p>
      </div>

      {/* Stats */}
      <div className="stats shadow w-full border border-base-300 bg-base-100">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FaBook className="w-8 h-8" />
          </div>
          <div className="stat-title">Total Lessons Created</div>
          <div className="stat-value text-primary">{totalLessons}</div>
          <div className="stat-desc">Your personal library size</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaStar className="w-8 h-8" />
          </div>
          <div className="stat-title">Total Saved (Favorites)</div>
          <div className="stat-value text-secondary">{favorites.length}</div>
          <div className="stat-desc">Lessons bookmarked for later</div>
        </div>
        <div className="stat hidden sm:block">
          <div className="stat-figure text-accent">
            <FaPlusCircle className="w-8 h-8" />
          </div>
          <div className="stat-title">Monthly Contributions</div>
          <div className="stat-value text-accent">
            {
              lessons.filter(
                (l) =>
                  new Date(l.createdAt).getMonth() === new Date().getMonth()
              ).length
            }
          </div>
          <div className="stat-desc">New lessons added this month</div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-base-content">
          ⚡ Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/dashboard/add-lesson"
            className="card bg-primary text-primary-content shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body p-4 md:p-6 text-center">
              <FaPlusCircle className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-lg font-bold">Create New Lesson</h3>
            </div>
          </Link>
          <Link
            to="/dashboard/my-favorite"
            className="card bg-secondary text-secondary-content shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body p-4 md:p-6 text-center">
              <FaHeart className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-lg font-bold">View My Favorites</h3>
            </div>
          </Link>
          <Link
            to="/dashboard/profile"
            className="card bg-neutral text-neutral-content shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body p-4 md:p-6 text-center">
              <FaCog className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-lg font-bold">Profile Settings</h3>
            </div>
          </Link>
          <Link
            to="/"
            className="card bg-info text-info-content shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body p-4 md:p-6 text-center">
              <FaQuestionCircle className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-lg font-bold">Get Help/Support</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Analytics + Recently Added */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart */}
        <div className="lg:col-span-2 card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold">
              📈 Weekly Activity Reflection
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recently Added Lessons */}
        <div className="lg:col-span-1 card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold">
              🕒 Recently Added
            </h2>
            <ul className="space-y-3 mt-2 menu p-0">
              {lessons.slice(0, 4).map((lesson) => (
                <li key={lesson._id} className="hover:bg-base-200 rounded-md">
                  <Link to={`/lesson/${lesson._id}`}>{lesson.title}</Link>
                </li>
              ))}
            </ul>
            <div className="card-actions justify-end mt-4">
              <Link
                to="/dashboard/my-lessons"
                className="btn btn-sm btn-outline btn-primary"
              >
                View All Lessons →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
