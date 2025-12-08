import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router";
import LoadingSpinner from "../LoadingSpenner/LoadingSpenner";
import { useEffect } from "react";
import { imageUpload } from "../../Utils";

export default function UpdateLesson({ isPremiumUser }) {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: lesson, isPending } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (lesson) {
      reset({
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        emotionalTone: lesson.emotionalTone, // set select value
        privacy: lesson.privacy,
        accessLevel: lesson.accessLevel,
      });
    }
  }, [lesson, reset]);

  const onSubmit = async (data) => {
    const {
      title,
      description,
      category,
      emotionalTone,
      image,
      privacy,
      accessLevel,
    } = data;

    let imageURL = lesson.image; // যদি user নতুন image না দেয়, তাহলে old image রাখবে
    if (image && image[0]) {
      imageURL = await imageUpload(image[0]); // নতুন image আপলোড
    }

    const updateData = {
      title,
      description,
      category,
      emotionalTone,
      privacy,
      accessLevel,
      image: imageURL,
    };

    try {
      await axiosSecure.put(`/lessons/${id}`, updateData);
      alert("Lesson updated successfully!");
      // refresh data
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Update Life Lesson ✨
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Lesson Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter lesson title"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">
            Full Description / Story
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={5}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Write your updated story..."
          ></textarea>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select Category</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>
        </div>

        {/* Emotional Tone */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Emotional Tone</label>
          <select
            {...register("emotionalTone", { required: true })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select Emotional Tone</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>
        </div>

        {/* Image */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">
            Replace Image (Optional)
          </label>
          <input
            type="file"
            {...register("image")}
            className="w-full border p-3 rounded-lg cursor-pointer bg-gray-50"
          />
        </div>

        {/* Privacy */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Privacy</label>
          <select
            {...register("privacy", { required: true })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Access Level */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Access Level</label>
          <select
            {...register("accessLevel", { required: true })}
            disabled={!isPremiumUser}
            className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition ${
              !isPremiumUser ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>

          {!isPremiumUser && (
            <p className="text-sm text-red-500">
              Premium required to enable this option
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition shadow-md"
        >
          Update Lesson
        </button>
      </form>
    </div>
  );
}
