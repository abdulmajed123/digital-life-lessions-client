import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../Utils";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/Animations/success.json";

const AddLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useRole();
  const { register, handleSubmit, reset, watch } = useForm();

  const [showAnimation, setShowAnimation] = useState(false);
  const [preview, setPreview] = useState(null);

  const watchImage = watch("image");

  // Image preview
  React.useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [watchImage]);

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image?.[0];
      const imageURL = imageFile ? await imageUpload(imageFile) : null;

      const lessonData = {
        title: data.title,
        description: data.description,
        category: data.category,
        emotionalTone: data.emotionalTone,
        image: imageURL,
        privacy: data.privacy,
        accessLevel: data.accessLevel,
        authorName: user?.displayName,
        authorEmail: user?.email,
        authorPhoto: user?.photoURL,
        createdAt: new Date(),
        featured: false,
        reviewed: false,
        flagged: false,
      };

      const res = await axiosSecure.post("/lessons", lessonData);

      if (res.data.insertedId) {
        reset();
        setPreview(null);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 2500);
      }
    } catch (error) {
      console.error("Lesson create failed:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl relative">
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-800 dark:text-gray-100">
        Add New Life Lesson
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="font-semibold text-slate-700 dark:text-gray-200">
            Lesson Title
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter lesson title"
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-slate-700 dark:text-gray-200">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={5}
            placeholder="Enter lesson description"
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Category & Emotional Tone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-slate-700 dark:text-gray-200">
              Category
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="">Select Category</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-gray-200">
              Emotional Tone
            </label>
            <select
              {...register("emotionalTone", { required: true })}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="">Select Emotional Tone</option>
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold text-slate-700 dark:text-gray-200">
            Image (Optional)
          </label>
          <input
            type="file"
            {...register("image")}
            accept="image/*"
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 max-h-60 rounded-lg border border-gray-300 dark:border-gray-600 object-cover"
            />
          )}
        </div>

        {/* Privacy & Access Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-slate-700 dark:text-gray-200">
              Privacy
            </label>
            <select
              {...register("privacy", { required: true })}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-gray-200">
              Access Level
            </label>
            <select
              {...register("accessLevel", { required: true })}
              disabled={!isPremium}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Submit Lesson
        </button>
      </form>

      {/* Success Lottie */}
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-64 h-64 rounded-2xl bg-white/10 dark:bg-gray-900/50 backdrop-blur-md shadow-xl flex flex-col items-center justify-center animate-scaleIn">
            <Lottie
              animationData={successAnimation}
              loop={false}
              style={{ width: 160, height: 160 }}
            />
            <p className="text-white font-semibold mt-4 text-lg">
              Lesson Added!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLesson;
