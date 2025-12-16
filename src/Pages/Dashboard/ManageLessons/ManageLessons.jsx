import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
import Swal from "sweetalert2";

export default function ManageLessons() {
  const axiosSecure = useAxiosSecure();

  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("");
  const [flagged, setFlagged] = useState("");

  // 🔹 Fetch lessons with filters
  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["total-lessons", category, visibility, flagged],
    queryFn: async () => {
      let url = "/total-lessons";
      const params = [];
      if (category) params.push(`category=${category}`);
      if (visibility) params.push(`visibility=${visibility}`);
      if (flagged) params.push(`flag=${flagged}`);
      if (params.length) url += `?${params.join("&")}`;

      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  // 🔹 Fetch stats
  const { data: stats } = useQuery({
    queryKey: ["lessons-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/lessons/stats/all");
      return res.data;
    },
  });

  // 🔹 Delete lesson
  const handleDeleteLesson = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${id}`).then(() => {
          refetch();
          Swal.fire("Deleted!", "Lesson removed.", "success");
        });
      }
    });
  };

  // 🔹 Toggle featured
  const toggleFeatured = (lesson) => {
    axiosSecure
      .patch(`/lessons/${lesson._id}/featured`, { featured: !lesson.featured })
      .then(() => refetch());
  };

  // 🔹 Toggle reviewed
  const toggleReviewed = (lesson) => {
    axiosSecure
      .patch(`/lessons/${lesson._id}/reviewed`, { reviewed: !lesson.reviewed })
      .then(() => refetch());
  };

  //  Total Reported Lessons
  const { data: totalReported = 0 } = useQuery({
    queryKey: ["total-reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/admin/dashboard/total-reported-lessons"
      );
      return res.data.totalReported;
    },
  });

  if (isLoading || !stats) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-4">Manage Lessons</h2>

      {/* 🔹 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-5 bg-blue-50 dark:bg-blue-900 rounded-xl shadow text-center hover:shadow-lg transition">
          <p className="font-semibold text-blue-700 dark:text-blue-300">
            Public Lessons
          </p>
          <p className="text-2xl font-bold mt-2">{stats?.public || 0}</p>
        </div>
        <div className="p-5 bg-green-50 dark:bg-green-900 rounded-xl shadow text-center hover:shadow-lg transition">
          <p className="font-semibold text-green-700 dark:text-green-300">
            Private Lessons
          </p>
          <p className="text-2xl font-bold mt-2">{stats?.private || 0}</p>
        </div>
        <div className="p-5 bg-red-50 dark:bg-red-900 rounded-xl shadow text-center hover:shadow-lg transition">
          <p className="font-semibold text-red-700 dark:text-red-300">
            Flagged Lessons
          </p>
          <p className="text-3xl font-bold mt-2">{totalReported}</p>
        </div>
      </div>

      {/* 🔹 Filters */}
      <div className="flex gap-4 flex-wrap items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow mb-4">
        <select
          className="select select-bordered w-48 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>

        <select
          className="select select-bordered w-48 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="">All Visibility</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </div>

      {/* 🔹 Lessons Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Creator</th>
              <th className="p-3">Category</th>
              <th className="p-3">Visibility</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Reviewed</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800">
            {lessons.map((lesson) => (
              <tr
                key={lesson._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="p-3 font-medium">{lesson.title}</td>
                <td className="p-3">{lesson.authorName}</td>
                <td className="p-3">{lesson.category}</td>
                <td className="p-3">{lesson.privacy}</td>

                <td className="p-3">
                  <button
                    onClick={() => toggleFeatured(lesson)}
                    className={`px-2 py-1 rounded-xl ${
                      lesson.featured
                        ? "bg-yellow-300 dark:bg-yellow-500"
                        : "bg-gray-200 dark:bg-gray-600"
                    }`}
                  >
                    {lesson.featured ? "Yes" : "No"}
                  </button>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => toggleReviewed(lesson)}
                    className={`px-2 py-1 rounded-xl ${
                      lesson.reviewed
                        ? "bg-green-300 dark:bg-green-500"
                        : "bg-gray-200 dark:bg-gray-600"
                    }`}
                  >
                    {lesson.reviewed ? "Yes" : "No"}
                  </button>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="px-3 py-1 bg-red-500 dark:bg-red-600 text-white rounded-xl hover:bg-red-600 dark:hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
