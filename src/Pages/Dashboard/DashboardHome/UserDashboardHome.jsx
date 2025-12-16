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

  // Chart Data
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const chartData = days.map((day, idx) => {
    const item = analytics.find((d) => d._id === idx + 1);
    return { day, count: item ? item.count : 0 };
  });

  return (
    <div className="space-y-8 p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          👋 Welcome Back, {user?.displayName || "User"}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's a quick overview of your progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 dark:bg-blue-900/40 p-6 rounded-xl shadow">
          <div className="flex items-center gap-4">
            <FaBook className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Total Lessons Created
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalLessons}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Your personal library
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-900/40 p-6 rounded-xl shadow">
          <div className="flex items-center gap-4">
            <FaStar className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Total Saved
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {favorites.length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Lessons bookmarked
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-100 dark:bg-green-900/40 p-6 rounded-xl shadow hidden sm:flex">
          <div className="flex items-center gap-4">
            <FaPlusCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Monthly Contributions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {
                  lessons.filter(
                    (l) =>
                      new Date(l.createdAt).getMonth() === new Date().getMonth()
                  ).length
                }
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                New lessons this month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          ⚡ Quick Actions
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/dashboard/add-lesson"
            className="card bg-primary text-primary-content shadow-xl"
          >
            <div className="card-body text-center">
              <FaPlusCircle className="w-10 h-10 mx-auto mb-2" />
              <h3 className="font-bold">Create Lesson</h3>
            </div>
          </Link>

          <Link
            to="/dashboard/my-favorite"
            className="card bg-secondary text-secondary-content shadow-xl"
          >
            <div className="card-body text-center">
              <FaHeart className="w-10 h-10 mx-auto mb-2" />
              <h3 className="font-bold">My Favorites</h3>
            </div>
          </Link>

          <Link
            to="/profile"
            className="card bg-neutral text-neutral-content shadow-xl"
          >
            <div className="card-body text-center">
              <FaCog className="w-10 h-10 mx-auto mb-2" />
              <h3 className="font-bold">Profile</h3>
            </div>
          </Link>

          <Link to="/" className="card bg-info text-info-content shadow-xl">
            <div className="card-body text-center">
              <FaQuestionCircle className="w-10 h-10 mx-auto mb-2" />
              <h3 className="font-bold">Help</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Analytics + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card bg-white dark:bg-gray-800 shadow-xl border dark:border-gray-700">
          <div className="card-body">
            <h2 className="card-title text-gray-800 dark:text-white">
              📈 Weekly Activity
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="count" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card bg-white dark:bg-gray-800 shadow-xl border dark:border-gray-700">
          <div className="card-body">
            <h2 className="card-title text-gray-800 dark:text-white">
              🕒 Recently Added
            </h2>

            <div className="space-y-3">
              {lessons.slice(0, 4).map((lesson) => (
                <Link
                  key={lesson._id}
                  to={`/lesson/${lesson._id}`}
                  className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {lesson.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-4 text-right">
              <Link
                to="/dashboard/my-lessons"
                className="btn btn-sm btn-outline btn-primary"
              >
                View All →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
