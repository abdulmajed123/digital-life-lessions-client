// src/pages/AdminOverview.jsx
import React from "react";
import {
  FaUsers,
  FaGlobe,
  FaFlag,
  FaChartLine,
  FaPlusSquare,
  FaStar,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardHomeAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  console.log(lessons);
  // --- Mock Data for Demonstration ---
  const platformStats = {
    totalUsers: "12,500",
    totalPublicLessons: "3,840",
    totalReportedLessons: "12",
    newLessonsToday: "55",
  };

  const activeContributors = [
    { name: "Alice Z.", lessons: 150, id: 1 },
    { name: "Bob Y.", lessons: 122, id: 2 },
    { name: "Charlie X.", lessons: 98, id: 3 },
  ];
  // -----------------------------------

  return (
    <div className="space-y-10 p-4 md:p-8 bg-base-200 min-h-screen">
      {/* Header */}
      <header className="pb-4 border-b border-base-300">
        <h1 className="text-4xl font-extrabold text-primary">
          📊 Admin Panel Overview
        </h1>
        <p className="text-base-content/80 mt-1">
          Monitor system activity and health at a glance.
        </p>
      </header>

      {/* Section 1: Core Platform Metrics (Stats Grid) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-5">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-2xl font-bold text-primary">
                {platformStats.totalUsers}
              </h2>
              <FaUsers className="text-4xl text-primary/60" />
            </div>
            <p className="text-sm text-base-content/70">Total Users</p>
            <div className="badge badge-success badge-outline">+5% week</div>
          </div>
        </div>

        {/* Total Public Lessons */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-5">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-2xl font-bold text-secondary">
                {platformStats.totalPublicLessons}
              </h2>
              <FaGlobe className="text-4xl text-secondary/60" />
            </div>
            <p className="text-sm text-base-content/70">Total Public Lessons</p>
            <div className="badge badge-info badge-outline">
              {platformStats.newLessonsToday} New Today
            </div>
          </div>
        </div>

        {/* Total Reported/Flagged Lessons */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-5">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-2xl font-bold text-error">
                {platformStats.totalReportedLessons}
              </h2>
              <FaFlag className="text-4xl text-error/60" />
            </div>
            <p className="text-sm text-base-content/70">Flagged Lessons</p>
            <div className="badge badge-error badge-outline">
              Action Required
            </div>
          </div>
        </div>

        {/* Today's New Lessons (using a calculated metric) */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-5">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-2xl font-bold text-accent">
                {platformStats.newLessonsToday}
              </h2>
              <FaPlusSquare className="text-4xl text-accent/60" />
            </div>
            <p className="text-sm text-base-content/70">Lessons Added Today</p>
            <div className="badge badge-warning badge-outline">
              Monitor Trend
            </div>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* Section 2: Graphs and Activity (Dual Panel) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2a: Growth Graphs (Takes 2/3 width) */}
        <div className="lg:col-span-2 card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold flex items-center">
              <FaChartLine className="mr-2 text-info" /> Platform Growth Trends
            </h2>

            <div className="mt-4 space-y-6">
              {/* Lesson Growth Graph Placeholder */}
              <div className="h-40 bg-base-200 rounded-lg flex items-center justify-center p-4">
                <p className="text-base-content/60 italic">
                  Graph Placeholder: Lesson Growth (Last 30 Days)
                </p>
              </div>

              <div className="divider"></div>

              {/* User Growth Graph Placeholder */}
              <div className="h-40 bg-base-200 rounded-lg flex items-center justify-center p-4">
                <p className="text-base-content/60 italic">
                  Graph Placeholder: User Growth (Monthly)
                </p>
              </div>
            </div>

            <div className="card-actions justify-end mt-4">
              <button className="btn btn-sm btn-ghost text-info">
                View Detailed Reports
              </button>
            </div>
          </div>
        </div>

        {/* 2b: Most Active Contributors (Takes 1/3 width) */}
        <div className="lg:col-span-1 card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold flex items-center">
              <FaStar className="mr-2 text-warning" /> Top Contributors
            </h2>

            <ul className="menu bg-base-100 w-full p-2 rounded-box">
              {activeContributors.map((user, index) => (
                <li key={user.id} className="hover:bg-base-200 rounded-lg">
                  <a
                    href={`/admin/user/${user.id}`}
                    className="flex justify-between items-center p-3"
                  >
                    <div className="font-medium">
                      {index + 1}. {user.name}
                    </div>
                    <div className="badge badge-lg badge-ghost">
                      {user.lessons} Lessons
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <div className="card-actions justify-end mt-4">
              <button className="btn btn-sm btn-ghost">
                View All Rankings
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardHomeAdmin;
