import React, { useEffect, useState } from "react";
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
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();
  const { id, lessonId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons", lessonId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/similar/${lessonId}`);
      return res.data;
    },
  });

  console.log(lessons);
  const { data: lesson, isPending } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

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
        // Update UI in real-time
        lesson.likesCount = res.data.likesCount;
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update like");
    }
  };

  const handleReport = async () => {
    if (!user) {
      toast.info("Please log in to report");
      navigate("/login");
      return;
    }

    const reason = prompt(
      "Report Reason:\n1. Inappropriate Content\n2. Hate Speech or Harassment\n3. Misleading or False Info\n4. Spam or Promotional Content\n5. Sensitive or Disturbing Content\n6. Other"
    );

    if (!reason) return;

    try {
      await axiosSecure.post("/lessonsReports", {
        lessonId: lesson._id,
        reporterUserId: user._id,
        reportedUserEmail: lesson.authorEmail,
        reason,
        timestamp: new Date(),
      });

      toast.success("Lesson reported successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to report lesson");
    }
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  const isPremiumUser = false; // Assume viewer is not premium for demo

  // Premium blur content
  const contentClass =
    lesson.premium && !isPremiumUser ? "blur-sm relative" : "";

  return (
    <section className="container mx-auto px-5 py-10">
      {/* Lesson Card */}
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
          {/* Lesson Title */}
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {lesson.title}
          </h1>

          {/* Lesson Description */}
          <p className="text-gray-700 mb-4">{lesson.description}</p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span>Category: {lesson.category}</span>
            <span>Tone: {lesson.emotionalTone}</span>
            <span>Created: {lesson.createdAt}</span>
            <span>Updated: {lesson.updatedAt}</span>
            <span>Visibility: Public</span>
            <span>⏱ Estimated Reading: 5 min</span>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-4 text-gray-600">
            <span>❤️ {lesson.likesCount}</span>
            <span>🔖 {lesson.favorites}</span>
            <span>👀 {Math.floor(Math.random() * 10000)}</span>
          </div>

          {/* Interaction Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              // onClick={() => setLiked(!liked)}
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
            >
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}{" "}
              Like
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
            >
              {saved ? (
                <FaBookmark className="text-blue-500" />
              ) : (
                <FaRegBookmark />
              )}{" "}
              Save
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

          {/* Author Card */}
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

          {/* Comments Section (Static UI) */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold">User {i}</p>
                <p className="text-gray-700">
                  This is a sample comment for the lesson.
                </p>
              </div>
            ))}
            <textarea
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg mb-2"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Similar Lessons */}
      <h2 className="text-2xl text-center font-bold mt-10 mb-6 text-gray-800">
        Similar Lessons
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="bg-white rounded-xl shadow-md p-4">
            <img
              src="https://i.ibb.co/4pDNDk1/avatar.png"
              alt="lesson"
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-gray-800">Lesson Title {i}</h3>
            <p className="text-xs text-gray-500">Category</p>
          </div>
        ))}
      </div>
    </section>
  );
}
