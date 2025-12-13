// import { AiFillLock } from "react-icons/ai";
// import { Link } from "react-router";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../../Component/LoadingSpenner/LoadingSpenner";
// import useRole from "../../Hooks/useRole";

// const PublicLessons = () => {
//   const axiosSecure = useAxiosSecure();
//   const { isPremium } = useRole();

//   const { data: lessons = [], isLoading } = useQuery({
//     queryKey: ["lessons"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/lessons");
//       return res.data;
//     },
//   });

//   console.log(lessons);

//   if (isLoading) return <LoadingSpinner></LoadingSpinner>;

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="max-w-7xl mx-auto px-4 py-10">
//         <p>{lessons.length}</p>
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Browse Public Life Lessons
//         </h1>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {lessons.map((lesson) => {
//             const isLocked = lesson.accessLevel === "Premium" && !isPremium;

//             return (
//               <div
//                 key={lesson._id}
//                 className="card bg-base-100 shadow-xl rounded-lg relative overflow-hidden"
//               >
//                 {/* Card Image */}
//                 <div className="h-40 w-full">
//                   <img
//                     src={lesson.image}
//                     alt={lesson.title}
//                     className={`h-full w-full object-cover ${
//                       isLocked ? "blur-md opacity-70" : ""
//                     }`}
//                   />
//                 </div>

//                 {/* Lock Overlay for Premium */}
//                 {isLocked && (
//                   <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white">
//                     <AiFillLock size={40} className="mb-2" />
//                     <p className="font-semibold text-center">
//                       Premium Lesson — Upgrade to view
//                     </p>
//                   </div>
//                 )}

//                 {/* Card Body */}
//                 <div className="p-4 space-y-2">
//                   <h3 className="font-bold text-lg line-clamp-1">
//                     {lesson.title}
//                   </h3>

//                   <p className="text-sm text-gray-600 line-clamp-2">
//                     {lesson.description}
//                   </p>

//                   {/* Badges */}
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     <span className="badge badge-primary badge-sm">
//                       {lesson.category}
//                     </span>
//                     <span className="badge badge-secondary badge-sm">
//                       {lesson.emotionalTone}
//                     </span>
//                     <span
//                       className={`badge badge-sm ${
//                         lesson.accessLevel === "Premium"
//                           ? "badge-accent"
//                           : "badge-success"
//                       }`}
//                     >
//                       {lesson.accessLevel}
//                     </span>
//                   </div>

//                   {/* Creator Info */}
//                   <div className="flex items-center gap-3 mt-3">
//                     <img
//                       src={lesson.authorPhoto}
//                       alt="creator"
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="font-semibold text-sm">
//                         {lesson.authorName}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {new Date(lesson.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Buttons */}
//                   <div className="mt-4">
//                     {isLocked ? (
//                       <button className="btn btn-outline btn-sm w-full">
//                         Upgrade to Premium
//                       </button>
//                     ) : (
//                       <Link
//                         to={`/lesson/${lesson._id}`}
//                         className="btn btn-primary btn-sm w-full"
//                       >
//                         See Details
//                       </Link>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublicLessons;

import { AiFillLock } from "react-icons/ai";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Component/LoadingSpenner/LoadingSpenner";
import useRole from "../../Hooks/useRole";
import { useState, useEffect } from "react";
// import debounce from "lodash.debounce";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useRole();

  // --------------------
  // UI States
  // --------------------
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [page, setPage] = useState(1);
  const limit = 9;

  // Debounce Search
  // const debouncer = debounce((value) => {
  //   setDebouncedSearch(value);
  //   setPage(1);
  // }, 500);

  // useEffect(() => {
  //   debouncer(search);
  //   return () => debouncer.cancel();
  // }, [search]);

  // --------------------
  // Query to backend
  // --------------------
  const { data, isLoading } = useQuery({
    queryKey: ["lessons", debouncedSearch, category, tone, sortBy, page],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons", {
        params: {
          q: debouncedSearch || undefined,
          category: category || undefined,
          tone: tone || undefined,
          sortBy,
          page,
          limit,
        },
      });
      return res.data;
    },
  });

  const lessons = data?.data || [];
  const meta = data?.meta || {};

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* ---------- Header ---------- */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Browse Public Life Lessons
        </h1>

        {/* ---------- Filters UI ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category Filter */}
          <select
            className="select select-bordered w-full"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Categories</option>
            <option value="Life">Life</option>
            <option value="Business">Business</option>
            <option value="Productivity">Productivity</option>
            <option value="Relationship">Relationship</option>
            <option value="Health">Health</option>
          </select>

          {/* Tone Filter */}
          <select
            className="select select-bordered w-full"
            value={tone}
            onChange={(e) => {
              setTone(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Emotional Tones</option>
            <option value="Motivational">Motivational</option>
            <option value="Happy">Happy</option>
            <option value="Neutral">Neutral</option>
            <option value="Sad">Sad</option>
          </select>

          {/* Sort */}
          <select
            className="select select-bordered w-full"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="newest">Newest</option>
            <option value="mostSaved">Most Saved</option>
            <option value="relevance">Most Relevant</option>
          </select>
        </div>

        {/* Count */}
        <p className="text-sm mb-3">
          Showing <b>{lessons.length}</b> of <b>{meta.total}</b> lessons
        </p>

        {/* ---------- Lessons Grid ---------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => {
            const isLocked = lesson.accessLevel === "Premium" && !isPremium;

            return (
              <div
                key={lesson._id}
                className="card bg-base-100 shadow-xl rounded-lg relative overflow-hidden"
              >
                {/* Image */}
                <div className="h-40 w-full">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className={`h-full w-full object-cover ${
                      isLocked ? "blur-md opacity-70" : ""
                    }`}
                  />
                </div>

                {/* Lock Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white">
                    <AiFillLock size={40} className="mb-2" />
                    <p className="font-semibold text-center">
                      Premium Lesson — Upgrade to view
                    </p>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-lg line-clamp-1">
                    {lesson.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {lesson.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="badge badge-primary badge-sm">
                      {lesson.category}
                    </span>
                    <span className="badge badge-secondary badge-sm">
                      {lesson.tone}
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

                  {/* Creator Info */}
                  <div className="flex items-center gap-3 mt-3">
                    <img
                      src={lesson.authorPhoto}
                      alt="creator"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {lesson.authorName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4">
                    {isLocked ? (
                      <button className="btn btn-outline btn-sm w-full">
                        Upgrade to Premium
                      </button>
                    ) : (
                      <Link
                        to={`/lesson/${lesson._id}`}
                        className="btn btn-primary btn-sm w-full"
                      >
                        See Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---------- Pagination ---------- */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            className="btn btn-sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {meta.page} of {meta.totalPages}
          </span>

          <button
            className="btn btn-sm"
            disabled={meta.page >= meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicLessons;
