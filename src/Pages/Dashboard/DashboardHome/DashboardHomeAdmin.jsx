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

  // ✅ Total Users
  const { data: totalUsers = 0, isLoading: loadingUsers } = useQuery({
    queryKey: ["total-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/total-users");
      return res.data.totalUsers;
    },
  });

  // ✅ Total Public Lessons
  const { data: totalPublicLessons = 0, isLoading: loadingPublic } = useQuery({
    queryKey: ["total-public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/admin/dashboard/total-public-lessons"
      );
      return res.data.totalPublicLessons;
    },
  });

  // ✅ Total Reported Lessons
  const { data: totalReported = 0, isLoading: loadingReported } = useQuery({
    queryKey: ["total-reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/admin/dashboard/total-reported-lessons"
      );
      return res.data.totalReported;
    },
  });

  // ✅ Top Contributors
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

  // ✅ Today's Lessons
  const { data: todaysLessons = 0, isLoading: loadingTodays } = useQuery({
    queryKey: ["todays-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/todays-lessons");
      return res.data.todaysLessons;
    },
  });

  // ✅ Lesson Growth
  const { data: lessonGrowth = [], isLoading: loadingLessonGrowth } = useQuery({
    queryKey: ["lesson-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/lesson-growth");
      return res.data;
    },
  });

  // ✅ User Growth
  const { data: userGrowth = [], isLoading: loadingUserGrowth } = useQuery({
    queryKey: ["user-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/user-growth");
      return res.data;
    },
  });

  // ✅ Show loading until all queries are ready
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
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded text-center">
          <p className="font-bold">Total Users</p>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="p-4 bg-green-100 rounded text-center">
          <p className="font-bold">Public Lessons</p>
          <p className="text-2xl">{totalPublicLessons}</p>
        </div>
        <div className="p-4 bg-red-100 rounded text-center">
          <p className="font-bold">Reported Lessons</p>
          <p className="text-2xl">{totalReported}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded text-center">
          <p className="font-bold">Today's Lessons</p>
          <p className="text-2xl">{todaysLessons}</p>
        </div>
      </div>

      {/* Most Active Contributors */}
      <div className="p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Most Active Contributors</h3>
        <ul className="list-disc pl-5">
          {topContributors.map((c) => (
            <li key={c._id}>
              {c._id} — {c.lessonsCount} lessons
            </li>
          ))}
        </ul>
      </div>

      {/* Lesson Growth Chart */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-bold mb-2">Lesson Growth (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={lessonGrowth.map((l) => ({ date: l._id, count: l.count }))}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* User Growth Chart */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-bold mb-2">User Growth (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={userGrowth.map((u) => ({ date: u._id, count: u.count }))}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
