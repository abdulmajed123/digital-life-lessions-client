import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";

export default function DashboardHomeAdmin() {
  const axiosSecure = useAxiosSecure();

  // Total Users
  const { data: totalUsers = 0, isLoading: loadingUsers } = useQuery({
    queryKey: ["total-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/total-users");
      return res.data.totalUsers;
    },
  });

  //  Total Public Lessons
  const { data: totalPublicLessons = 0, isLoading: loadingPublic } = useQuery({
    queryKey: ["total-public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/admin/dashboard/total-public-lessons"
      );
      return res.data.totalPublicLessons;
    },
  });

  //  Total Reported Lessons
  const { data: totalReported = 0, isLoading: loadingReported } = useQuery({
    queryKey: ["total-reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/admin/dashboard/total-reported-lessons"
      );
      return res.data.totalReported;
    },
  });

  //  Top Contributors
  const { data: topContributors = [], isLoading: loadingContributors } =
    useQuery({
      queryKey: ["top-contributors"],
      queryFn: async () => {
        const res = await axiosSecure.get(
          "/admin/dashboard/most-active-contributors"
        );
        return res.data;
      },
    });

  //  Today's Lessons
  const { data: todaysLessons = 0, isLoading: loadingTodays } = useQuery({
    queryKey: ["todays-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/todays-lessons");
      return res.data.todaysLessons;
    },
  });

  // Lesson Growth
  const { data: lessonGrowth = [], isLoading: loadingLessonGrowth } = useQuery({
    queryKey: ["lesson-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/lesson-growth");
      return res.data;
    },
  });

  //  User Growth
  const { data: userGrowth = [], isLoading: loadingUserGrowth } = useQuery({
    queryKey: ["user-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/user-growth");
      return res.data;
    },
  });

  // Show loading until all queries are ready
  if (
    loadingUsers ||
    loadingPublic ||
    loadingReported ||
    loadingContributors ||
    loadingTodays ||
    loadingLessonGrowth ||
    loadingUserGrowth
  ) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-gray-100">
        Admin Dashboard
      </h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl shadow hover:shadow-lg transition text-center">
          <p className="font-semibold text-blue-700 dark:text-blue-300">
            Total Users
          </p>
          <p className="text-3xl font-bold mt-2">{totalUsers}</p>
        </div>

        <div className="p-5 bg-green-50 dark:bg-green-900/30 rounded-xl shadow hover:shadow-lg transition text-center">
          <p className="font-semibold text-green-700 dark:text-green-300">
            Public Lessons
          </p>
          <p className="text-3xl font-bold mt-2">{totalPublicLessons}</p>
        </div>

        <div className="p-5 bg-red-50 dark:bg-red-900/30 rounded-xl shadow hover:shadow-lg transition text-center">
          <p className="font-semibold text-red-700 dark:text-red-300">
            Reported Lessons
          </p>
          <p className="text-3xl font-bold mt-2">{totalReported}</p>
        </div>

        <div className="p-5 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl shadow hover:shadow-lg transition text-center">
          <p className="font-semibold text-yellow-700 dark:text-yellow-300">
            Today's Lessons
          </p>
          <p className="text-3xl font-bold mt-2">{todaysLessons}</p>
        </div>
      </div>

      {/* Most Active Contributors */}
      <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h3 className="font-bold text-slate-700 dark:text-gray-200 mb-3">
          Most Active Contributors
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-gray-300">
          {topContributors.map((c) => (
            <li key={c._id}>
              <span className="font-semibold">{c._id}</span> — {c.lessonsCount}{" "}
              lessons
            </li>
          ))}
        </ul>
      </div>

      {/* Lesson Growth Chart */}
      <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h3 className="font-bold text-slate-700 dark:text-gray-200 mb-3">
          Lesson Growth (Last 7 Days)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={lessonGrowth.map((l) => ({ date: l._id, count: l.count }))}
          >
            <XAxis dataKey="date" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#4b5563",
                color: "#f9fafb",
              }}
            />
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* User Growth Chart */}
      <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h3 className="font-bold text-slate-700 dark:text-gray-200 mb-3">
          User Growth (Last 7 Days)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={userGrowth.map((u) => ({ date: u._id, count: u.count }))}
          >
            <XAxis dataKey="date" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#4b5563",
                color: "#f9fafb",
              }}
            />
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
