import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpenner/LoadingSpenner";
import { motion } from "framer-motion";

export default function MostSavedLessons() {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["mostSavedLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/most-saved-lessons");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (!lessons.length)
    return (
      <p className="text-center text-gray-500 mt-6 font-medium">
        No saved lessons
      </p>
    );

  const top3 = lessons.slice(0, 3);
  const rest = lessons.slice(3);

  return (
    <section className="my-12 px-4 md:px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10 mt-10">
        ❤️ Most Saved Lessons
      </h2>

      {/* Top 3 Highlight */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-10">
        {top3.map((lesson, index) => (
          <motion.div
            key={lesson._id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative rounded-2xl shadow-xl p-6 border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 overflow-hidden transition duration-300"
          >
            {/* Rank Badge */}
            <div className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg bg-indigo-500">
              #{index + 1}
            </div>

            <h3 className="text-xl font-bold mb-3 line-clamp-1 text-gray-900 dark:text-white">
              {lesson.lessonTitle}
            </h3>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={lesson.authorPhoto}
                alt={lesson.authorName}
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {lesson.authorName}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge badge-primary text-xs">
                Category: {lesson.category}
              </span>
              <span className="badge badge-secondary text-xs">
                Tone: {lesson.emotionalTone}
              </span>
              <span className="badge badge-accent text-xs">
                Access: {lesson.accessLevel}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
              {lesson.lessonDescription}
            </p>

            <p className="text-sm text-red-500 font-semibold flex items-center gap-1">
              ❤️ <span>{lesson.savesCount}</span> Saved
            </p>
          </motion.div>
        ))}
      </div>

      {/* Rest of the lessons */}
      {rest.length > 0 && (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {rest.map((lesson) => (
            <motion.div
              key={lesson._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-100 dark:border-gray-700 transition duration-300"
            >
              <h3 className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white">
                {lesson.lessonTitle}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <img
                  src={lesson.authorPhoto}
                  alt={lesson.authorName}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {lesson.authorName}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="badge badge-primary text-xs">
                  Category: {lesson.category}
                </span>
                <span className="badge badge-secondary text-xs">
                  Tone: {lesson.emotionalTone}
                </span>
                <span className="badge badge-accent text-xs">
                  Access: {lesson.accessLevel}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
                {lesson.lessonDescription}
              </p>

              <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                ❤️ <span>{lesson.savesCount}</span> Saved
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
