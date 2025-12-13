// import React from "react";

// export default function FeaturedLessons() {
//   const featuredLessons = [
//     {
//       _id: 1,
//       title: "The Art of Staying Consistent",
//       category: "Personal Growth",
//       image: "https://i.ibb.co/4pDNDk1/avatar.png",
//       creator: "Abdul Majid",
//       tone: "Motivational",
//     },
//     {
//       _id: 2,
//       title: "Why Failure Is Your Best Teacher",
//       category: "Mindset",
//       image: "https://i.ibb.co/4pDNDk1/avatar.png",
//       creator: "Sarah Ahmed",
//       tone: "Reflective",
//     },
//     {
//       _id: 3,
//       title: "Mastering Focus in a Distracted World",
//       category: "Productivity",
//       image: "https://i.ibb.co/4pDNDk1/avatar.png",
//       creator: "Tanvir Hossain",
//       tone: "Practical",
//     },
//   ];

//   return (
//     <div className="">
//       <section className="my-16 ">
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 ">
//           ⭐ Featured Life Lessons
//         </h2>
//         <p className="text-gray-600 text-center mb-10 text-sm">
//           Handpicked lessons selected by our Admin Team — inspiring, deep and
//           meaningful.
//         </p>

//         <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
//           {featuredLessons.map((lesson) => (
//             <div
//               key={lesson._id}
//               className="bg-white border border-gray-100 rounded-xl shadow hover:shadow-lg transition p-5"
//             >
//               {/* Image */}
//               <img
//                 src={lesson.image}
//                 alt={lesson.title}
//                 className="w-full h-44 rounded-lg object-cover mb-4"
//               />

//               {/* Category + Tone */}
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
//                   {lesson.category}
//                 </span>

//                 <span className="text-xs px-3 py-1 rounded-full bg-pink-100 text-pink-700">
//                   {lesson.tone}
//                 </span>
//               </div>

//               {/* Title */}
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 {lesson.title}
//               </h3>

//               {/* Creator */}
//               <p className="text-sm text-gray-500 mb-4">
//                 ✍️ By <span className="font-medium">{lesson.creator}</span>
//               </p>

//               {/* Button */}
//               <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm transition">
//                 View Lesson
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Component/LoadingSpenner/LoadingSpenner";
import { AiFillStar } from "react-icons/ai";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-lessons?limit=6");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (lessons.length === 0) return null; // No featured lessons found

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <AiFillStar className="text-yellow-500" size={28} />
        <h1 className="text-3xl font-bold">Featured Life Lessons</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="card bg-base-100 shadow-xl rounded-lg overflow-hidden border"
          >
            <img
              src={lesson.image}
              alt={lesson.title}
              className="h-40 w-full object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="font-bold text-lg line-clamp-1">
                ⭐ {lesson.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2">
                {lesson.description}
              </p>

              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="badge badge-primary badge-sm">
                  {lesson.category}
                </span>
                <span className="badge badge-secondary badge-sm">
                  {lesson.emotionalTone}
                </span>
              </div>

              <Link
                to={`/lesson/${lesson._id}`}
                className="btn btn-primary btn-sm w-full mt-3"
              >
                Read Lesson
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLessons;
