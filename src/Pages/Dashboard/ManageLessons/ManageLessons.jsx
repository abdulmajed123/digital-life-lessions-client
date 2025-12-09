import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function ManageLessons() {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState({
    category: "all",
    visibility: "all",
    flagged: "all",
  });

  const { data: lessons = [], isPending } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  // Dummy data (replace with API data)
  // const lessons = [
  //   {
  //     _id: 1,
  //     title: "How to Stay Focused",
  //     creator: "John Doe",
  //     category: "Productivity",
  //     visibility: "Public",
  //     flagged: false,
  //     featured: false,
  //     reviewed: false,
  //   },
  //   {
  //     _id: 2,
  //     title: "Managing Stress",
  //     creator: "Jane Smith",
  //     category: "Health",
  //     visibility: "Private",
  //     flagged: true,
  //     featured: true,
  //     reviewed: true,
  //   },
  // ];

  const handleLessonDelete = (lessonId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/lessons/${lessonId}`)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleToggleFeatured = (id) => {
    console.log("Toggle featured", id);
  };

  const handleToggleReviewed = (id) => {
    console.log("Toggle reviewed", id);
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Lessons</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="select select-bordered"
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="Productivity">Productivity</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>

        <select
          className="select select-bordered"
          value={filter.visibility}
          onChange={(e) => setFilter({ ...filter, visibility: e.target.value })}
        >
          <option value="all">All Visibility</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>

        <select
          className="select select-bordered"
          value={filter.flagged}
          onChange={(e) => setFilter({ ...filter, flagged: e.target.value })}
        >
          <option value="all">All</option>
          <option value="flagged">Flagged</option>
          <option value="not_flagged">Not Flagged</option>
        </select>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded w-48 text-center">
          <p className="text-lg font-bold">Public Lessons</p>
          <p className="text-2xl">120</p>
        </div>
        <div className="bg-green-100 p-4 rounded w-48 text-center">
          <p className="text-lg font-bold">Private Lessons</p>
          <p className="text-2xl">35</p>
        </div>
        <div className="bg-red-100 p-4 rounded w-48 text-center">
          <p className="text-lg font-bold">Flagged Content</p>
          <p className="text-2xl">5</p>
        </div>
      </div>

      {/* Lessons Table */}
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Creator</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Visibility</th>
            <th className="px-4 py-2">Flagged</th>
            <th className="px-4 py-2">Featured</th>
            <th className="px-4 py-2">Reviewed</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson._id} className="border-b">
              <td className="px-4 py-2">{lesson.title}</td>
              <td className="px-4 py-2">{lesson.name}</td>
              <td className="px-4 py-2">{lesson.category}</td>
              <td className="px-4 py-2">{lesson.privacy}</td>
              <td className="px-4 py-2">
                {lesson.flagged ? (
                  <span className="text-red-600 font-bold">Yes</span>
                ) : (
                  "No"
                )}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleToggleFeatured(lesson._id)}
                  className={`px-2 py-1 rounded ${
                    lesson.featured ? "bg-yellow-300" : "bg-gray-200"
                  }`}
                >
                  {lesson.featured ? "Yes" : "No"}
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleToggleReviewed(lesson._id)}
                  className={`px-2 py-1 rounded ${
                    lesson.reviewed ? "bg-green-300" : "bg-gray-200"
                  }`}
                >
                  {lesson.reviewed ? "Yes" : "No"}
                </button>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleLessonDelete(lesson._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
