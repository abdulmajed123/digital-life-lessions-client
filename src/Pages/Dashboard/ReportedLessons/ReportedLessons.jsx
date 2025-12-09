import React, { useState } from "react";

export default function ReportedLessons() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLessonReports, setSelectedLessonReports] = useState([]);

  // Dummy data (replace with API data)
  const reportedLessons = [
    {
      _id: 1,
      title: "How to Stay Focused",
      reportCount: 3,
      reports: [
        { reporter: "John Doe", reason: "Inappropriate content" },
        { reporter: "Jane Smith", reason: "Spam" },
        { reporter: "Alice", reason: "Off-topic" },
      ],
    },
    {
      _id: 2,
      title: "Managing Stress",
      reportCount: 1,
      reports: [{ reporter: "Bob", reason: "Duplicate content" }],
    },
  ];

  const openModal = (reports) => {
    setSelectedLessonReports(reports);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLessonReports([]);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      console.log("Delete lesson", id);
    }
  };

  const handleIgnore = (id) => {
    console.log("Ignore reports for lesson", id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reported / Flagged Lessons</h2>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Lesson Title</th>
            <th className="px-4 py-2">Report Count</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportedLessons.map((lesson) => (
            <tr key={lesson._id} className="border-b">
              <td className="px-4 py-2">{lesson.title}</td>
              <td className="px-4 py-2">{lesson.reportCount}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => openModal(lesson.reports)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  View Reports
                </button>
                <button
                  onClick={() => handleDelete(lesson._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete Lesson
                </button>
                <button
                  onClick={() => handleIgnore(lesson._id)}
                  className="bg-gray-300 px-2 py-1 rounded"
                >
                  Ignore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">Report Details</h3>
            <ul className="mb-4 max-h-64 overflow-y-auto">
              {selectedLessonReports.map((report, index) => (
                <li key={index} className="mb-2 border-b pb-1">
                  <p>
                    <span className="font-semibold">{report.reporter}</span>:{" "}
                    {report.reason}
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
