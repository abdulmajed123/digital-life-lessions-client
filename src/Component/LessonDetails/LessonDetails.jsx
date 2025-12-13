import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaFlag,
  FaShareAlt,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "../LoadingSpenner/LoadingSpenner";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

export default function LessonDetails() {
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();
  const { id } = useParams(); // Only id param
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch lesson
  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
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

  // Favorite status
  const { data: favoriteData = {}, refetch: refetchFavorite } = useQuery({
    queryKey: ["favorite-status", id, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${id}/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email && !!id,
  });

  // const isFavorite = favoriteData?.isFavorite || false;
  const favoritesCount = favoriteData?.favoritesCount || 0;

  if (isLoading || !lesson) return <LoadingSpinner />;

  const handleLike = async () => {
    if (!user) {
      toast.info("Please log in to like");
      navigate("/login");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/lessons/${lesson._id}/like`, {
        userId: user._id,
      });
      if (res.data.success) {
        setLiked(!liked);
        lesson.likesCount = res.data.likesCount; // update UI
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update like");
    }
  };

  // const handleSave = async () => {
  //   if (!user) {
  //     toast.info("Please log in to save lessons");
  //     navigate("/login");
  //     return;
  //   }
  //   try {
  //     const res = await axiosSecure.post("/favorites", {
  //       lessonId: id,
  //       email: user.email,
  //     });

  //     if (res.data.insertedId) {
  //       toast.success("Lesson saved!");
  //       refetchFavorite();
  //     } else {
  //       toast.info("Already saved");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Failed to save lesson");
  //   }
  // };

  // const handleUnsave = async () => {
  //   try {
  //     await axiosSecure.delete(`/favorites/${id}/${user.email}`);
  //     toast.success("Removed from favorites");
  //     refetchFavorite();
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Failed to remove favorite");
  //   }
  // };

  // const handleUnsave = async () => {
  //   try {
  //     await axiosSecure.delete("/favorites", {
  //       data: { lessonId: id, email: user.email },
  //     });
  //     toast.success("Removed from favorites");
  //     refetchFavorite();
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Failed to remove favorite");
  //   }
  // };

  // const handleReport = async () => {
  //   if (!user) {
  //     toast.info("Please log in to report");
  //     navigate("/login");
  //     return;
  //   }

  //   const reason = prompt(
  //     "Report Reason:\n1. Inappropriate Content\n2. Hate Speech or Harassment\n3. Misleading or False Info\n4. Spam or Promotional Content\n5. Sensitive or Disturbing Content\n6. Other"
  //   );
  //   if (!reason) return;

  //   try {
  //     await axiosSecure.post("/lessonsReports", {
  //       lessonId: lesson._id,
  //       reporterUserId: user._id,
  //       reportedUserEmail: user.email,
  //       reportedName: user.displayName,
  //       reason,
  //       timestamp: new Date(),
  //     });
  //     toast.success("Lesson reported successfully!");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Failed to report lesson");
  //   }
  // };

  const handleSave = async () => {
    if (!user) {
      toast.info("Please log in to save lessons");
      navigate("/login");
      return;
    }

    try {
      const res = await axiosSecure.post("/favorites", {
        lessonId: id,
        email: user.email,
      });

      if (res.data.insertedId) {
        toast.success("Lesson saved!");
        refetchFavorite();
      } else {
        toast.info("Already saved");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to save lesson");
    }
  };

  const handleUnsave = async () => {
    try {
      await axiosSecure.delete("/favorites", {
        data: { lessonId: id, email: user.email },
      });

      toast.success("Removed from favorites");
      refetchFavorite();
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove favorite");
    }
  };

  const handleReport = async () => {
    if (!user) {
      toast.info("Please log in to report");
      navigate("/login");
      return;
    }

    const reasonNumber = prompt(
      "Report Reason:\n1. Inappropriate Content\n2. Hate Speech or Harassment\n3. Misleading or False Info\n4. Spam or Promotional Content\n5. Sensitive or Disturbing Content\n6. Other"
    );

    if (!reasonNumber) return;

    // Map number to text
    const reasonMap = {
      1: "Inappropriate Content",
      2: "Hate Speech or Harassment",
      3: "Misleading or False Info",
      4: "Spam or Promotional Content",
      5: "Sensitive or Disturbing Content",
      6: "Other",
    };

    const reasonText = reasonMap[reasonNumber] || "Other";

    try {
      await axiosSecure.post("/lessonsReports", {
        lessonId: lesson._id,
        reporterUserId: user._id,
        lessonsTitle: lesson.title,
        reportedUserEmail: user.email,
        reportedName: user.displayName,
        reason: reasonText, // text saved in DB
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
    <section className="container mx-auto px-5 py-10">
      <div
        className={`rounded-xl overflow-hidden shadow-lg bg-white ${contentClass}`}
      >
        {lesson.premium && !isPremiumUser && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/70 z-10 text-center p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              ⭐ Premium Lesson
            </h2>
            <p className="text-gray-600 mb-4">
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
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {lesson.title}
          </h1>
          <p className="text-gray-700 mb-4">{lesson.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span>Category: {lesson.category}</span>
            <span>Tone: {lesson.emotionalTone}</span>
            <span>Created: {lesson.createdAt}</span>
            <span>Updated: {lesson.updatedAt}</span>
            <span>Visibility: Public</span>
          </div>

          <div className="flex gap-6 mb-4 text-gray-600">
            <span>❤️ {lesson.likesCount}</span>
            <span>🔖 {favoritesCount}</span>
            <span>👀 {Math.floor(Math.random() * 10000)}</span>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
            >
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}{" "}
              Like
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
            >
              <FaBookmark className="text-blue-500" />
              Save
            </button>
            <button
              onClick={handleUnsave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
            >
              <FaRegBookmark />
              unsave
            </button>

            <button
              onClick={handleReport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition"
            >
              <FaFlag /> Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200 transition">
              <FaShareAlt /> Share
            </button>
          </div>

          <div className="flex items-center gap-4 border-t pt-4 mb-6">
            <img
              src={lesson.authorPhoto}
              className="h-12 w-12 rounded-full"
              alt="author"
            />
            <div>
              <p className="font-semibold">{lesson.authorName}</p>
              <p className="text-sm text-gray-500">
                Total Lessons: {lesson.totalLessons || 0}
              </p>
              <button className="text-indigo-600 text-sm hover:underline mt-1">
                View all lessons by this author
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl text-center font-bold mt-10 mb-6 text-gray-800">
        Similar Lessons
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {similarLessons.map((lesson, i) => (
          <div key={lesson._id} className="bg-white rounded-xl shadow-md p-4">
            <img
              src={lesson.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="lesson"
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
            <p className="text-xs text-gray-500">{lesson.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
