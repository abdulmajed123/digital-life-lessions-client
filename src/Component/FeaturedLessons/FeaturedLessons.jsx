// import { Link } from "react-router";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../../Component/LoadingSpenner/LoadingSpenner";
// import { AiFillStar } from "react-icons/ai";

// const FeaturedLessons = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: lessons = [], isLoading } = useQuery({
//     queryKey: ["featured-lessons"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/featured-lessons?limit=6");
//       return res.data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;

//   if (lessons.length === 0) return null; // No featured lessons found

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <div className="flex items-center gap-2 mb-6">
//         <AiFillStar className="text-yellow-500" size={28} />
//         <h1 className="text-3xl font-bold">Featured Life Lessons</h1>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {lessons.map((lesson) => (
//           <div
//             key={lesson._id}
//             className="card bg-base-100 shadow-xl rounded-lg overflow-hidden border"
//           >
//             <img
//               src={lesson.image}
//               alt={lesson.title}
//               className="h-40 w-full object-cover"
//             />

//             <div className="p-4 space-y-2">
//               <h3 className="font-bold text-lg line-clamp-1">
//                 ⭐ {lesson.title}
//               </h3>

//               <p className="text-sm text-gray-600 line-clamp-2">
//                 {lesson.description}
//               </p>

//               <div className="flex gap-2 mt-2 flex-wrap">
//                 <span className="badge badge-primary badge-sm">
//                   {lesson.category}
//                 </span>
//                 <span className="badge badge-secondary badge-sm">
//                   {lesson.emotionalTone}
//                 </span>
//               </div>

//               <Link
//                 to={`/lesson/${lesson._id}`}
//                 className="btn btn-primary btn-sm w-full mt-3"
//               >
//                 Read Lesson
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedLessons;

import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Component/LoadingSpenner/LoadingSpenner";
import { AiFillStar, AiFillLock } from "react-icons/ai";
import { motion } from "framer-motion";
import useRole from "../../Hooks/useRole";
const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();
  // get current user
  const { isPremium } = useRole();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-lessons?limit=6");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (lessons.length === 0) return null;

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    }),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <AiFillStar className="text-yellow-500" size={28} />
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Featured Life Lessons
        </h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => {
          // 🔹 Lock logic:
          const isLocked =
            lesson.accessLevel === "Premium" && !(isPremium ?? false);

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
                  <p className="font-semibold text-center">Premium Lesson</p>
                </div>
              )}

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg line-clamp-1 text-gray-900 dark:text-white">
                  ⭐ {lesson.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {lesson.description}
                </p>

                <div className="flex gap-2 flex-wrap mt-2">
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

                {/* Author info */}
                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={lesson.authorPhoto}
                    alt={lesson.authorName}
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
                  <Link
                    to={`/lesson/${lesson._id}`}
                    className="btn btn-primary btn-sm w-full hover:scale-105 transition-transform"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedLessons;
