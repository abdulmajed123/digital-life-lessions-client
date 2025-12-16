import { AiFillLock } from "react-icons/ai";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Component/LoadingSpenner/LoadingSpenner";
import useRole from "../../Hooks/useRole";
import { useState } from "react";
import { motion } from "framer-motion";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useRole();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["lessons", search, category, tone, sortBy, page],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons", {
        params: {
          q: search || undefined,
          category: category || undefined,
          tone: tone || undefined,
          sortBy,
          page,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 500,
  });

  const lessons = data?.data || [];
  const meta = data?.meta || {};

  if (isLoading) return <LoadingSpinner />;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Browse Public Life Lessons
      </h1>

      {/* Filters + Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 pr-20"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {isFetching && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm animate-pulse">
              Searching...
            </span>
          )}
        </div>

        <select
          className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="Career">Career</option>
          <option value="Mistakes Learned">Personal Growth</option>
          <option value="Life">Relationships</option>
          <option value="Business">Mindset</option>
          <option value="Productivity">Mistakes Learned</option>
        </select>

        <select
          className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          value={tone}
          onChange={(e) => {
            setTone(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Emotional Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Gratitude">Gratitude</option>
          <option value="Happy">Happy</option>
          <option value="Neutral">Realization</option>
          <option value="Sad">Sad</option>
        </select>

        <select
          className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
        >
          <option value="newest">Newest</option>
          <option value="mostSaved">Most Saved</option>
        </select>
      </div>

      <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
        Showing <b>{lessons.length}</b> of <b>{meta.total}</b> lessons
        {isFetching && (
          <span className="ml-2 text-gray-400 dark:text-gray-500 animate-pulse">
            Fetching...
          </span>
        )}
      </p>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => {
          const isLocked = lesson.accessLevel === "Premium" && !isPremium;
          return (
            <motion.div
              key={lesson._id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300 relative"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className={`h-full w-full object-cover transform transition-transform duration-300 hover:scale-105 ${
                    isLocked ? "blur-md opacity-70" : ""
                  }`}
                />
              </div>

              {isLocked && (
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white">
                  <AiFillLock size={40} className="mb-2" />
                  <p className="font-semibold text-center">
                    Premium Lesson — Upgrade to view
                  </p>
                </div>
              )}

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg line-clamp-1 text-gray-900 dark:text-white">
                  {lesson.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-primary badge-sm">
                    {lesson.category}
                  </span>
                  <span className="badge badge-secondary badge-sm">
                    {lesson.emotionalTone}
                  </span>
                  <span
                    className={`badge badge-sm ${
                      lesson.accessLevel === "Premium"
                        ? "badge-accent"
                        : "badge-success"
                    }`}
                  >
                    {lesson.accessLevel}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={lesson.authorPhoto}
                    alt="creator"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">
                      {lesson.authorName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  {isLocked ? (
                    <button className="btn btn-outline btn-sm w-full hover:bg-accent hover:text-white transition">
                      Upgrade to Premium
                    </button>
                  ) : (
                    <Link
                      to={`/lesson/${lesson._id}`}
                      className="btn btn-primary btn-sm w-full hover:scale-105 transition-transform"
                    >
                      See Details
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          className="btn btn-sm"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          Page {meta.page} of {meta.totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={page >= meta.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PublicLessons;
