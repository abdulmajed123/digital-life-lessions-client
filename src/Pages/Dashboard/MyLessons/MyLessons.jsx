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

  const { data = {}, isPending } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { lessons = [] } = data;

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
        axiosSecure.delete(`/lessons/${lessonId}`);
        Swal.fire("Deleted!", "Your lesson has been deleted.", "success");
      }
    });
  };

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        📘 My Lessons: {lessons.length}
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
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
              <tr
                key={lesson._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="font-semibold text-gray-800 dark:text-white">
                  {lesson.title}
                </td>

                <td className="text-gray-600 dark:text-gray-300">
                  {lesson.privacy}
                </td>

                <td className="text-gray-600 dark:text-gray-300">
                  {lesson.accessLevel}
                </td>

                <td className="text-sm text-gray-600 dark:text-gray-300">
                  ❤️ {lesson.likesCount}
                </td>

                <td className="text-gray-600 dark:text-gray-300">
                  {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="text-end space-x-2">
                  <Link
                    to={`/lesson/${lesson._id}`}
                    className="btn btn-sm btn-outline dark:btn-black"
                  >
                    Details
                  </Link>

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

        {lessons.length === 0 && (
          <p className="text-center py-6 text-gray-500 dark:text-gray-400">
            No lessons found 🚫
          </p>
        )}
      </div>
    </div>
  );
};

export default MyLessons;
