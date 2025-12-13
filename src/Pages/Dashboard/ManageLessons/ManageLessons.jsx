import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
import Swal from "sweetalert2";

export default function ManageLessons() {
  const axiosSecure = useAxiosSecure();

  // 🔹 Fetch lessons
  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["total-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-lessons");
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
      // confirmButtonColor: "#d33",
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
      .patch(`/lessons/${lesson._id}/featured`, {
        featured: !lesson.featured,
      })
      .then(() => refetch());
  };

  // 🔹 Toggle reviewed
  const toggleReviewed = (lesson) => {
    axiosSecure
      .patch(`/lessons/${lesson._id}/reviewed`, {
        reviewed: !lesson.reviewed,
      })
      .then(() => refetch());
  };

  if (isLoading || !stats) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Lessons</h2>

      {/* 🔹 Stats */}
      <div className="flex gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded w-48 text-center">
          <p className="font-bold">Public Lessons</p>
          <p className="text-2xl">{stats?.public || 0}</p>
        </div>
        <div className="p-4 bg-green-100 rounded w-48 text-center">
          <p className="font-bold">Private Lessons</p>
          <p className="text-2xl">{stats?.private || 0}</p>
        </div>
        <div className="p-4 bg-red-100 rounded w-48 text-center">
          <p className="font-bold">Flagged Lessons</p>
          <p className="text-2xl">{stats?.flagged || 0}</p>
        </div>
      </div>

      {/* 🔹 Lessons Table */}
      <table className="min-w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Creator</th>
            <th className="p-3">Category</th>
            <th className="p-3">Visibility</th>
            <th className="p-3">Flagged</th>
            <th className="p-3">Featured</th>
            <th className="p-3">Reviewed</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{lesson.title}</td>
              <td className="p-3">{lesson.authorName}</td>
              <td className="p-3">{lesson.category}</td>
              <td className="p-3">{lesson.privacy}</td>
              <td className="p-3">{lesson.flagged ? "Yes" : "No"}</td>

              <td className="p-3">
                <button
                  onClick={() => toggleFeatured(lesson)}
                  className={`px-2 py-1 rounded ${
                    lesson.featured ? "bg-yellow-300" : "bg-gray-200"
                  }`}
                >
                  {lesson.featured ? "Yes" : "No"}
                </button>
              </td>

              <td className="p-3">
                <button
                  onClick={() => toggleReviewed(lesson)}
                  className={`px-2 py-1 rounded ${
                    lesson.reviewed ? "bg-green-300" : "bg-gray-200"
                  }`}
                >
                  {lesson.reviewed ? "Yes" : "No"}
                </button>
              </td>

              <td className="p-3">
                <button
                  onClick={() => handleDeleteLesson(lesson._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
