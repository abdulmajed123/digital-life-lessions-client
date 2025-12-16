import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function ReportedLessons() {
  const axiosSecure = useAxiosSecure();
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  // 🔹 Fetch all reported lessons
  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-lessons");
      return res.data;
    },
  });

  // 🔹 Fetch reports for a single lesson
  const { data: reports = [], refetch: refetchReports } = useQuery({
    queryKey: ["lesson-reports", selectedLessonId],
    enabled: !!selectedLessonId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/reported-lessons/${selectedLessonId}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // 🔹 View details modal
  const handleViewDetails = (lessonId) => {
    setSelectedLessonId(lessonId);
    refetchReports();
    Swal.fire({
      title: "Reports",
      html: reports
        .map(
          (r) =>
            `<p><strong>${r.reportedName} (${r.reportedUserEmail})</strong>: ${r.reason}</p>`
        )
        .join(""),
      width: 600,
    });
  };

  // 🔹 Delete lesson
  const handleDeleteLesson = (lessonId) => {
    Swal.fire({
      title: "Delete Lesson?",
      text: "This will delete the lesson and all its reports!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/admin/lessons/${lessonId}`);
        Swal.fire("Deleted!", "Lesson removed.", "success");
        refetch();
      }
    });
  };

  // 🔹 Ignore reports
  const handleIgnoreReports = async (lessonId) => {
    await axiosSecure.delete(`/admin/reported-lessons/${lessonId}/ignore`);
    Swal.fire("Ignored", "Reports have been cleared.", "success");
    refetch();
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Reported Lessons</h2>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3">Lesson Title</th>
              <th className="p-3">Report Count</th>
              <th className="p-3">Details</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {lessons.map((l) => (
              <tr
                key={l._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="p-3">{l.lessonTitle}</td>
                <td className="p-3">{l.reportCount}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleViewDetails(l._id)}
                    className="px-2 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleDeleteLesson(l._id)}
                    className="px-2 py-1 bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleIgnoreReports(l._id)}
                    className="px-2 py-1 bg-yellow-500 dark:bg-yellow-600 text-white rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 transition"
                  >
                    Ignore
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
