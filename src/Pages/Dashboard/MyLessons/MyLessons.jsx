import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isPending } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${user?.email}`);
      return res.data;
    },
  });

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

  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        📘 My Lessons:{lessons.length}
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>Lesson</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Stats</th>
              <th>Created</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="border-b">
                <td className="font-semibold">How I Learned Discipline</td>

                <td>
                  <select className="select select-bordered select-sm">
                    <option>Public</option>
                    <option>Private</option>
                  </select>
                </td>

                <td>
                  <select
                    className="select select-bordered select-sm"
                    title="Only Premium users can select Premium"
                  >
                    <option>Free</option>
                    <option>Premium</option>
                  </select>
                </td>

                <td className="text-sm">❤️ 12 • ⭐ 5 • 💾 8</td>

                <td>2025-01-12</td>

                <td className="text-end space-x-2">
                  <button className="btn btn-sm btn-neutral">Details</button>
                  <Link
                    to={`/dashboard/lesson-update/${lesson._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleLessonDelete(lesson._id)}
                    className="btn btn-sm btn-error"
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
};

export default MyLessons;
