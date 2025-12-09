import React from "react";

export default function MostSavedLessons() {
  const savedLessons = [
    {
      _id: 1,
      title: "How I Overcame Self-Doubt",
      category: "Motivation",
      thumbnail: "https://i.ibb.co/4pDNDk1/avatar.png",
      saves: 122,
      creator: "Abdul Majid",
    },
    {
      _id: 2,
      title: "The Power of Daily Discipline",
      category: "Productivity",
      thumbnail: "https://i.ibb.co/4pDNDk1/avatar.png",
      saves: 95,
      creator: "Sarah Ahmed",
    },
    {
      _id: 3,
      title: "How to Stay Calm Under Pressure",
      category: "Mindset",
      thumbnail: "https://i.ibb.co/4pDNDk1/avatar.png",
      saves: 81,
      creator: "Tanvir Hossain",
    },
  ];

  return (
    <section className="my-16">
      {/* Centered Header */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        🔖 Most Saved Lessons
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {savedLessons.map((lesson) => (
          <div
            key={lesson._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100"
          >
            {/* Thumbnail */}
            <div className="relative mb-4">
              <img
                src={lesson.thumbnail}
                className="w-full h-40 object-cover rounded-lg"
                alt="lesson"
              />
              <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-full">
                ❤️ {lesson.saves} Saves
              </span>
            </div>

            {/* Lesson Info */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {lesson.title}
            </h3>

            <p className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full inline-block mb-3">
              {lesson.category}
            </p>

            {/* Creator */}
            <p className="text-sm text-gray-500 mb-4">
              ✍️ By <span className="font-medium">{lesson.creator}</span>
            </p>

            {/* Button */}
            <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition text-sm">
              View Lesson
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
