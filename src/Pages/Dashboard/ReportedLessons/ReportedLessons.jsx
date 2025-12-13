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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reported Lessons</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Lesson Title</th>
            <th className="p-3 text-left">Report Count</th>
            <th className="p-3 text-left">Details</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((l) => (
            <tr key={l._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{l.lessonTitle}</td>
              <td className="p-3">{l.reportCount}</td>
              <td className="p-3">
                {" "}
                <button
                  onClick={() => handleViewDetails(l._id)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  View Details
                </button>
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleDeleteLesson(l._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleIgnoreReports(l._id)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Ignore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
