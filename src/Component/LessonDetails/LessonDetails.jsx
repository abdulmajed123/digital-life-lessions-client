// import React, { useState } from "react";
// import {
//   FaHeart,
//   FaRegHeart,
//   FaBookmark,
//   FaRegBookmark,
//   FaFlag,
//   FaShareAlt,
// } from "react-icons/fa";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { Link, useNavigate, useParams } from "react-router";
// import { toast } from "react-toastify";

// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import useAuth from "../../Hooks/useAuth";
// import LoadingSpinner from "../LoadingSpenner/LoadingSpenner";
// import useRole from "../../Hooks/useRole";

// export default function LessonDetails() {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const [commentText, setCommentText] = useState("");
//   const { role } = useRole();

//   // Fetch lesson
//   const { data: lesson, isLoading } = useQuery({
//     queryKey: ["lesson", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/lessons/${id}`);
//       return res.data;
//     },
//     enabled: !!id,
//   });

//   // Fetch comments
//   const { data: comments = [] } = useQuery({
//     queryKey: ["comments", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/comments/${id}`);
//       return res.data;
//     },
//     enabled: !!id,
//   });

//   // Fetch similar lessons
//   const { data: similarLessons = [] } = useQuery({
//     queryKey: ["similar-lessons", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/lessons/similar/${id}`);
//       return res.data;
//     },
//     enabled: !!id,
//   });

//   // Fetch favorite status
//   const { data: favoriteData = {}, refetch: refetchFavorite } = useQuery({
//     queryKey: ["favorite-status", id, user?.email],
//     queryFn: async () => {
//       if (!user?.email) return { isFavorite: false, favoritesCount: 0 };
//       const res = await axiosSecure.get(`/favorites/${id}/${user.email}`);
//       return res.data;
//     },
//     enabled: !!id && !!user?.email,
//   });

//   if (isLoading || !lesson) return <LoadingSpinner />;

//   const isLiked = lesson.likes?.includes(user?.uid);
//   // const isFavorite = favoriteData?.isFavorite;
//   const favoritesCount = favoriteData?.favoritesCount || 0;

//   // Like / Unlike
//   const handleLike = async () => {
//     if (!user) {
//       toast.info("Please log in to like");
//       return navigate("/login");
//     }
//     try {
//       await axiosSecure.patch(`/lessons/${lesson._id}/like`, {
//         userId: user.uid,
//       });
//       queryClient.invalidateQueries(["lesson", id]);
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to update like");
//     }
//   };

//   // Save lesson
//   const handleSave = async () => {
//     if (!user) {
//       toast.info("Please log in to save lessons");
//       return navigate("/login");
//     }
//     try {
//       const res = await axiosSecure.post("/favorites", {
//         lessonId: id,
//         email: user.email,
//       });
//       if (res.data.insertedId) toast.success("Lesson saved!");
//       refetchFavorite();
//     } catch (err) {
//       console.log(err);
//       toast.info("Already saved");
//     }
//   };

//   // Unsave lesson
//   const handleUnsave = async () => {
//     if (!user) return;
//     try {
//       const res = await axiosSecure.delete("/favorites", {
//         data: { lessonId: id, email: user.email },
//       });
//       if (res.data.success) toast.success("Removed from favorites");
//       refetchFavorite();
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to remove favorite");
//     }
//   };

//   // Post comment
//   const handlePostComment = async () => {
//     if (!user) {
//       toast.info("Please login to comment");
//       return;
//     }
//     if (!commentText.trim()) return;

//     try {
//       const res = await axiosSecure.post("/comments", {
//         lessonId: id,
//         userEmail: user.email,
//         userName: user.displayName,
//         text: commentText,
//       });
//       if (res.data.success) {
//         toast.success("Comment posted!");
//         setCommentText("");
//         queryClient.invalidateQueries(["comments", id]);
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to post comment");
//     }
//   };

//   // Report lesson
//   const handleReport = async () => {
//     if (!user) {
//       toast.info("Please log in to report");
//       return navigate("/login");
//     }
//     const reasonNumber = prompt(
//       "Report Reason:\n1. Inappropriate Content\n2. Hate Speech or Harassment\n3. Misleading or False Info\n4. Spam or Promotional Content\n5. Sensitive or Disturbing Content\n6. Other"
//     );
//     if (!reasonNumber) return;

//     const reasonMap = {
//       1: "Inappropriate Content",
//       2: "Hate Speech or Harassment",
//       3: "Misleading or False Info",
//       4: "Spam or Promotional Content",
//       5: "Sensitive or Disturbing Content",
//       6: "Other",
//     };

//     try {
//       await axiosSecure.post("/lessonsReports", {
//         lessonId: lesson._id,
//         reporterUserId: user.uid,
//         lessonsTitle: lesson.title,
//         reportedUserEmail: user.email,
//         reportedName: user.displayName,
//         reason: reasonMap[reasonNumber] || "Other",
//         timestamp: new Date(),
//       });
//       toast.success("Lesson reported successfully!");
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to report lesson");
//     }
//   };

//   const isPremiumUser = false; // Demo
//   const contentClass =
//     lesson.premium && !isPremiumUser ? "blur-sm relative" : "";

//   return (
//     <section className="container mx-auto px-5 py-10">
//       <div
//         className={`rounded-xl overflow-hidden shadow-lg bg-white ${contentClass}`}
//       >
//         {lesson.premium && !isPremiumUser && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/70 z-10 text-center p-6">
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">
//               ⭐ Premium Lesson
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Upgrade to Premium to view this lesson.
//             </p>
//             <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
//               Upgrade Now
//             </button>
//           </div>
//         )}

//         <img
//           src={lesson.image}
//           alt="lesson"
//           className="w-full h-64 object-cover"
//         />
//         <div className="p-6">
//           <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
//           <p className="text-gray-700 mb-4">{lesson.description}</p>

//           <div className="flex gap-6 mb-4 text-gray-600">
//             <span>❤️ {lesson.likesCount || 0}</span>
//             <span>🔖 {favoritesCount}</span>
//             <span>👀 {Math.floor(Math.random() * 10000)}</span>
//           </div>

//           <div className="flex flex-wrap gap-4 mb-6">
//             {/* Like */}
//             <button
//               onClick={handleLike}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200"
//             >
//               {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}{" "}
//               Like
//             </button>

//             {/* Save/Unsave */}

//             <button
//               onClick={handleSave}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200"
//             >
//               <FaBookmark /> Save
//             </button>

//             <button
//               onClick={handleUnsave}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200"
//             >
//               <FaRegBookmark /> Unsave
//             </button>

//             {/* Report */}
//             <button
//               onClick={handleReport}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-200"
//             >
//               <FaFlag /> Report
//             </button>

//             {/* Share */}
//             <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200">
//               <FaShareAlt /> Share
//             </button>
//           </div>

//           {/* Author Info */}
//           <div className="flex items-center gap-4 border-t pt-4 mb-6">
//             <img
//               src={lesson.authorPhoto}
//               className="h-12 w-12 rounded-full"
//               alt="author"
//             />
//             <div>
//               <p className="font-semibold">{lesson.authorName}</p>
//               <p className="text-sm text-gray-500">
//                 Total Lessons: {lesson.totalLessons || 0}
//               </p>

//               {role && (
//                 <Link
//                   to={
//                     role === "admin" ? "/dashboard/admin-profile" : "/profile"
//                   }
//                   className="text-indigo-600 text-sm hover:underline mt-1"
//                 >
//                   View all lessons by this author
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Comment Section */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-bold mb-4">Comments</h2>
//         {user && (
//           <div className="mb-6">
//             <textarea
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               placeholder="Write your comment..."
//               className="w-full p-3 border rounded-lg mb-2"
//             />
//             <button
//               onClick={handlePostComment}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//             >
//               Post Comment
//             </button>
//           </div>
//         )}
//         <div className="space-y-4">
//           {comments.map((c) => (
//             <div key={c._id} className="border rounded-lg p-3">
//               <p className="font-semibold">{c.userName}</p>
//               <p className="text-gray-700">{c.text}</p>
//               <p className="text-xs text-gray-400">
//                 {new Date(c.createdAt).toLocaleString()}
//               </p>
//             </div>
//           ))}
//           {comments.length === 0 && <p>No comments yet. Be the first!</p>}
//         </div>
//       </div>

//       {/* Similar Lessons */}
//       <h2 className="text-2xl text-center font-bold mt-10 mb-6">
//         Similar Lessons
//       </h2>
//       <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
//         {similarLessons.map((item) => (
//           <div key={item._id} className="bg-white rounded-xl shadow-md p-4">
//             <img
//               src={item.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
//               alt=""
//               className="w-full h-36 object-cover rounded-lg mb-2"
//             />
//             <h3 className="font-semibold">{item.title}</h3>
//             <p className="text-xs text-gray-500">{item.category}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaFlag,
  FaShareAlt,
} from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../LoadingSpenner/LoadingSpenner";
import useRole from "../../Hooks/useRole";

export default function LessonDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const { role } = useRole();

  // Fetch lesson
  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch similar lessons
  const { data: similarLessons = [] } = useQuery({
    queryKey: ["similar-lessons", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/similar/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch favorite status
  const { data: favoriteData = {}, refetch: refetchFavorite } = useQuery({
    queryKey: ["favorite-status", id, user?.email],
    queryFn: async () => {
      if (!user?.email) return { isFavorite: false, favoritesCount: 0 };
      const res = await axiosSecure.get(`/favorites/${id}/${user.email}`);
      return res.data;
    },
    enabled: !!id && !!user?.email,
  });

  if (isLoading || !lesson) return <LoadingSpinner />;

  const isLiked = lesson.likes?.includes(user?.uid);
  const favoritesCount = favoriteData?.favoritesCount || 0;

  // Like / Unlike
  const handleLike = async () => {
    if (!user) {
      toast.info("Please log in to like");
      return navigate("/login");
    }
    try {
      await axiosSecure.patch(`/lessons/${lesson._id}/like`, {
        userId: user.uid,
      });
      queryClient.invalidateQueries(["lesson", id]);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update like");
    }
  };

  // Save lesson
  const handleSave = async () => {
    if (!user) {
      toast.info("Please log in to save lessons");
      return navigate("/login");
    }
    try {
      const res = await axiosSecure.post("/favorites", {
        lessonId: id,
        email: user.email,
      });
      if (res.data.insertedId) toast.success("Lesson saved!");
      refetchFavorite();
    } catch (err) {
      console.log(err);
      toast.info("Already saved");
    }
  };

  // Unsave lesson
  const handleUnsave = async () => {
    if (!user) return;
    try {
      const res = await axiosSecure.delete("/favorites", {
        data: { lessonId: id, email: user.email },
      });
      if (res.data.success) toast.success("Removed from favorites");
      refetchFavorite();
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove favorite");
    }
  };

  // Post comment
  const handlePostComment = async () => {
    if (!user) {
      toast.info("Please login to comment");
      return;
    }
    if (!commentText.trim()) return;

    try {
      const res = await axiosSecure.post("/comments", {
        lessonId: id,
        userEmail: user.email,
        userName: user.displayName,
        text: commentText,
      });
      if (res.data.success) {
        toast.success("Comment posted!");
        setCommentText("");
        queryClient.invalidateQueries(["comments", id]);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to post comment");
    }
  };

  // Report lesson
  const handleReport = async () => {
    if (!user) {
      toast.info("Please log in to report");
      return navigate("/login");
    }
    const reasonNumber = prompt(
      "Report Reason:\n1. Inappropriate Content\n2. Hate Speech or Harassment\n3. Misleading or False Info\n4. Spam or Promotional Content\n5. Sensitive or Disturbing Content\n6. Other"
    );
    if (!reasonNumber) return;

    const reasonMap = {
      1: "Inappropriate Content",
      2: "Hate Speech or Harassment",
      3: "Misleading or False Info",
      4: "Spam or Promotional Content",
      5: "Sensitive or Disturbing Content",
      6: "Other",
    };

    try {
      await axiosSecure.post("/lessonsReports", {
        lessonId: lesson._id,
        reporterUserId: user.uid,
        lessonsTitle: lesson.title,
        reportedUserEmail: user.email,
        reportedName: user.displayName,
        reason: reasonMap[reasonNumber] || "Other",
        timestamp: new Date(),
      });
      toast.success("Lesson reported successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to report lesson");
    }
  };

  const isPremiumUser = false; // Demo
  const contentClass =
    lesson.premium && !isPremiumUser ? "blur-sm relative" : "";

  return (
    <section className="container mx-auto px-5 py-10 text-gray-800 dark:text-gray-200">
      <div
        className={`rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 ${contentClass}`}
      >
        {lesson.premium && !isPremiumUser && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/70 dark:bg-gray-900/70 z-10 text-center p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              ⭐ Premium Lesson
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Upgrade to Premium to view this lesson.
            </p>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Upgrade Now
            </button>
          </div>
        )}

        <img
          src={lesson.image}
          alt="lesson"
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {lesson.description}
          </p>

          <div className="flex gap-6 mb-4 text-gray-600 dark:text-gray-400">
            <span>❤️ {lesson.likesCount || 0}</span>
            <span>🔖 {favoritesCount}</span>
            <span>👀 {Math.floor(Math.random() * 10000)}</span>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800"
            >
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}{" "}
              Like
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              <FaBookmark /> Save
            </button>

            <button
              onClick={handleUnsave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              <FaRegBookmark /> Unsave
            </button>

            <button
              onClick={handleReport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-800"
            >
              <FaFlag /> Report
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-800">
              <FaShareAlt /> Share
            </button>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4 border-t dark:border-gray-700 pt-4 mb-6">
            <img
              src={lesson.authorPhoto}
              className="h-12 w-12 rounded-full"
              alt="author"
            />
            <div>
              <p className="font-semibold">{lesson.authorName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Lessons: {lesson.totalLessons || 0}
              </p>
              {role && (
                <Link
                  to={
                    role === "admin" ? "/dashboard/admin-profile" : "/profile"
                  }
                  className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline mt-1"
                >
                  View all lessons by this author
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {user && (
          <div className="mb-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className="w-full p-3 border rounded-lg mb-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200"
            />
            <button
              onClick={handlePostComment}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Post Comment
            </button>
          </div>
        )}
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c._id}
              className="border rounded-lg p-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            >
              <p className="font-semibold">{c.userName}</p>
              <p className="text-gray-700 dark:text-gray-300">{c.text}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          {comments.length === 0 && <p>No comments yet. Be the first!</p>}
        </div>
      </div>

      {/* Similar Lessons */}
      <h2 className="text-2xl text-center font-bold mt-10 mb-6">
        Similar Lessons
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {similarLessons.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
          >
            <img
              src={item.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt=""
              className="w-full h-36 object-cover rounded-lg mb-2"
            />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {item.category}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
