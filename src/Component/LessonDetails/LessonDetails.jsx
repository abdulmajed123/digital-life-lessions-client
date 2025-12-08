// import React, { useState } from "react";
// import { Heart, Bookmark, Share2, Flag, User2 } from "lucide-react";

// // ===== Custom Button & Badge Components =====
// const Button = ({ children, onClick, className }) => (
//   <button
//     onClick={onClick}
//     className={`bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition ${className}`}
//   >
//     {children}
//   </button>
// );

// const Badge = ({ children, color = "blue", className }) => {
//   const colors = {
//     blue: "bg-blue-500 text-white",
//     green: "bg-green-500 text-white",
//     red: "bg-red-500 text-white",
//     yellow: "bg-yellow-500 text-black",
//     gray: "bg-gray-200 text-gray-800",
//   };
//   return (
//     <span
//       className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${colors[color]} ${className}`}
//     >
//       {children}
//     </span>
//   );
// };

// const LessonDetails = ({ lesson = {}, user = {}, allLessons = [] }) => {
//   const isPremiumUser = user?.isPremium || false;
//   const showUpgradeBanner = lesson?.access === "premium" && !isPremiumUser;

//   const [liked, setLiked] = useState(false);
//   const [favorited, setFavorited] = useState(false);
//   const [commentInput, setCommentInput] = useState("");
//   const [comments, setComments] = useState([
//     { user: "John", text: "Amazing lesson!" },
//     { user: "Sara", text: "Very inspiring ❤️" },
//   ]);

//   const viewsCount = Math.floor(Math.random() * 10000);

//   const similarLessons = allLessons
//     .filter(
//       (l) =>
//         l.id !== lesson.id &&
//         (l.category === lesson.category || l.tone === lesson.tone)
//     )
//     .slice(0, 6);

//   return (
//     <div className="max-w-6xl mx-auto py-12 px-4 relative">
//       {/* ===== Premium Banner ===== */}
//       {showUpgradeBanner && (
//         <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-10 rounded-lg border border-yellow-300 shadow-lg">
//           <p className="text-2xl font-bold mb-3">Premium Lesson 🔒</p>
//           <p className="text-gray-700 mb-5">
//             Upgrade to Premium to view full content
//           </p>
//           <Button onClick={() => (window.location.href = "/pricing")}>
//             Upgrade Now
//           </Button>
//         </div>
//       )}

//       {/* ===== Main Content ===== */}
//       <div className={showUpgradeBanner ? "filter blur-sm" : ""}>
//         {/* Featured Image */}
//         {lesson.image && (
//           <img
//             src={lesson.image}
//             alt="Lesson Cover"
//             className="w-full h-64 object-cover rounded-2xl shadow-lg mb-6"
//           />
//         )}

//         {/* Title */}
//         <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
//           {lesson.title}
//         </h1>

//         {/* Badges */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           <Badge color="blue">{lesson.category}</Badge>
//           <Badge color="gray">{lesson.tone}</Badge>
//           <Badge color="green">Public</Badge>
//           {lesson.access === "premium" && <Badge color="yellow">Premium</Badge>}
//         </div>

//         {/* Full Description */}
//         <p className="text-gray-800 leading-relaxed mb-8 whitespace-pre-line text-lg">
//           {lesson.description}
//         </p>

//         {/* Metadata */}
//         <div className="flex flex-wrap gap-6 text-gray-600 mb-8 text-sm">
//           <span>Created: {lesson.createdAt}</span>
//           <span>Updated: {lesson.updatedAt}</span>
//           <span>Views: {viewsCount.toLocaleString()}</span>
//           <span>Estimated reading: {lesson.readingTime || "5 min"}</span>
//         </div>

//         {/* Author Card */}
//         <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 p-5 border rounded-2xl shadow-md bg-white hover:shadow-xl transition">
//           <img
//             src={lesson.authorImage || "/default-avatar.png"}
//             alt="Author"
//             className="w-20 h-20 rounded-full object-cover shadow-md"
//           />
//           <div className="flex-1">
//             <p className="font-semibold text-lg">{lesson.authorName}</p>
//             <p className="text-gray-600">
//               Total Lessons: {lesson.totalLessons || 0}
//             </p>
//             <Button
//               className="mt-3 bg-gray-200 text-black hover:bg-gray-300"
//               onClick={() =>
//                 (window.location.href = `/author/${lesson.authorId}`)
//               }
//             >
//               View all lessons by author
//             </Button>
//           </div>
//         </div>

//         {/* Stats & Engagement */}
//         <div className="flex flex-wrap gap-6 items-center mb-8">
//           <span className="flex items-center gap-1 text-lg">
//             <Heart className="text-red-500" />{" "}
//             {liked ? lesson.likes + 1 : lesson.likes || 0}
//           </span>
//           <span className="flex items-center gap-1 text-lg">
//             <Bookmark className="text-yellow-500" />{" "}
//             {favorited ? lesson.favorites + 1 : lesson.favorites || 0}
//           </span>
//           <span className="flex items-center gap-1 text-lg">
//             👀 {viewsCount.toLocaleString()}
//           </span>
//         </div>

//         {/* Interaction Buttons */}
//         <div className="flex flex-wrap gap-3 mb-10">
//           <Button onClick={() => setFavorited(!favorited)}>
//             <Bookmark /> {favorited ? "Saved" : "Save to Favorites"}
//           </Button>
//           <Button onClick={() => setLiked(!liked)}>
//             <Heart /> {liked ? "Liked" : "Like"}
//           </Button>
//           <Button onClick={() => alert("Report clicked")}>
//             <Flag /> Report Lesson
//           </Button>
//           <Button
//             onClick={() => navigator.clipboard.writeText(window.location.href)}
//           >
//             <Share2 /> Share
//           </Button>
//         </div>

//         {/* Comments Section */}
//         <div className="mb-10">
//           <h2 className="text-2xl font-semibold mb-4">Comments</h2>
//           <div className="space-y-3">
//             {comments.map((c, idx) => (
//               <div key={idx} className="p-3 bg-gray-100 rounded-xl shadow-sm">
//                 <p className="font-semibold">{c.user}</p>
//                 <p className="text-gray-700">{c.text}</p>
//               </div>
//             ))}
//           </div>
//           {user && (
//             <div className="mt-4 flex flex-col sm:flex-row gap-3">
//               <input
//                 className="flex-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
//                 placeholder="Write a comment..."
//                 value={commentInput}
//                 onChange={(e) => setCommentInput(e.target.value)}
//               />
//               <Button
//                 onClick={() => {
//                   if (commentInput.trim()) {
//                     setComments([
//                       ...comments,
//                       { user: user.name || "You", text: commentInput },
//                     ]);
//                     setCommentInput("");
//                   }
//                 }}
//               >
//                 Post Comment
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Similar Lessons */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Similar Lessons</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {similarLessons.map((l) => (
//               <div
//                 key={l.id}
//                 className="border p-4 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
//               >
//                 {l.image && (
//                   <img
//                     src={l.image}
//                     alt={l.title}
//                     className="w-full h-36 object-cover rounded-lg mb-3"
//                   />
//                 )}
//                 <p className="font-semibold mb-2 text-lg">{l.title}</p>
//                 <div className="flex flex-wrap gap-2 mb-2">
//                   <Badge color="blue">{l.category}</Badge>
//                   <Badge color="gray">{l.tone}</Badge>
//                 </div>
//                 <Button
//                   className="mt-2 w-full text-sm"
//                   onClick={() => (window.location.href = `/lesson/${l.id}`)}
//                 >
//                   View Lesson
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LessonDetails;
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import LoadingSpinner from "../LoadingSpenner/LoadingSpenner";

const LessonDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: lesson, isPending } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });
  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="max-w-4xl mx-auto my-10 p-5 shadow-lg rounded-lg bg-white">
      <img src={lesson.image} alt="" className="rounded-md mb-4" />

      <h1 className="text-3xl font-bold mb-3">{lesson.title}</h1>
      <p className="text-gray-600 mb-2">{lesson.description}</p>

      <p className="font-semibold">Category: {lesson.category}</p>
      <p className="font-semibold">Emotional Tone: {lesson.emotionalTone}</p>

      <div className="mt-4 p-3 bg-gray-100 rounded-md">
        <h3 className="font-bold mb-2">Creator</h3>
        <p>Name: {lesson.creatorName}</p>
      </div>
    </div>
  );
};

export default LessonDetails;
