// import { useForm } from "react-hook-form";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useParams, useNavigate } from "react-router";
// import LoadingSpinner from "../LoadingSpenner/LoadingSpenner";
// import { useEffect } from "react";
// import { imageUpload } from "../../Utils";
// import useRole from "../../Hooks/useRole";
// import { toast } from "react-toastify";

// export default function UpdateLesson({ isPremiumUser }) {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { isPremium } = useRole();

//   // Fetch lesson
//   const { data: lesson, isLoading } = useQuery({
//     queryKey: ["lesson", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/lessons/${id}`);
//       return res.data;
//     },
//   });

//   const { register, handleSubmit, reset } = useForm();

//   // Pre-fill form when lesson data is available
//   useEffect(() => {
//     if (lesson) {
//       reset({
//         title: lesson.title,
//         description: lesson.description,
//         category: lesson.category,
//         emotionalTone: lesson.emotionalTone,
//         privacy: lesson.privacy,
//         accessLevel: lesson.accessLevel,
//       });
//     }
//   }, [lesson, reset]);

//   const onSubmit = async (data) => {
//     const {
//       title,
//       description,
//       category,
//       emotionalTone,
//       image,
//       privacy,
//       accessLevel,
//     } = data;

//     let imageURL = lesson.image;
//     if (image && image[0]) {
//       try {
//         imageURL = await imageUpload(image[0]);
//       } catch (err) {
//         console.error("Image upload failed", err);
//         toast.error("Image upload failed!");
//         return;
//       }
//     }

//     const updateData = {
//       title,
//       description,
//       category,
//       emotionalTone,
//       privacy,
//       accessLevel,
//       image: imageURL,
//     };

//     try {
//       await axiosSecure.put(`/lessons/${id}`, updateData);

//       toast.success("Lesson updated successfully!");
//       // Refresh lesson data
//       queryClient.invalidateQueries(["lesson", id]);
//       navigate("/public-lessons");
//     } catch (err) {
//       console.error(err);
//       toast.error("Update failed!");
//     }
//   };

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Update Life Lesson ✨
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Title */}
//         <div className="space-y-1">
//           <label className="font-semibold text-gray-700">Lesson Title</label>
//           <input
//             type="text"
//             {...register("title", { required: true })}
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
//             placeholder="Enter lesson title"
//           />
//         </div>

//         {/* Description */}
//         <div className="space-y-1">
//           <label className="font-semibold text-gray-700">
//             Full Description / Story
//           </label>
//           <textarea
//             {...register("description", { required: true })}
//             rows={5}
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
//             placeholder="Write your updated story..."
//           ></textarea>
//         </div>

//         {/* Category */}
//         <div className="space-y-1">
//           <label className="font-semibold text-gray-700">Category</label>
//           <select
//             {...register("category", { required: true })}
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
//           >
//             <option value="">Select Category</option>
//             <option value="Personal Growth">Personal Growth</option>
//             <option value="Career">Career</option>
//             <option value="Relationships">Relationships</option>
//             <option value="Mindset">Mindset</option>
//             <option value="Mistakes Learned">Mistakes Learned</option>
//           </select>
//         </div>

//         {/* Emotional Tone */}
//         <div className="space-y-1">
//           <label className="font-semibold text-gray-700">Emotional Tone</label>
//           <select
//             {...register("emotionalTone", { required: true })}
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
//           >
//             <option value="">Select Emotional Tone</option>
//             <option value="Motivational">Motivational</option>
//             <option value="Sad">Sad</option>
//             <option value="Realization">Realization</option>
//             <option value="Gratitude">Gratitude</option>
//           </select>
//         </div>

//         {/* Image */}
//         <div className="space-y-1">
//           <label className="font-semibold text-gray-700">
//             Replace Image (Optional)
//           </label>
//           <input
//             type="file"
//             {...register("image")}
//             className="w-full border p-3 rounded-lg cursor-pointer bg-gray-50"
//           />
//         </div>

//         {/* Privacy */}
//         <div className="space-y-1">
//           <label className="font-semibold text-gray-700">Privacy</label>
//           <select
//             {...register("privacy", { required: true })}
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
//           >
//             <option value="Public">Public</option>
//             <option value="Private">Private</option>
//           </select>
//         </div>

//         {/* Access Level */}
//         <div className="space-y-1">
//           <label className="font-semibold text-gray-700">Access Level</label>
//           <select
//             {...register("accessLevel", { required: true })}
//             disabled={!isPremium}
//             className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition ${
//               !isPremium ? "bg-gray-200 cursor-not-allowed" : ""
//             }`}
//           >
//             <option value="Free">Free</option>
//             <option value="Premium">Premium</option>
//           </select>
//           {!isPremiumUser && (
//             <p className="text-sm text-red-500">
//               Premium required to enable this option
//             </p>
//           )}
//         </div>

//         {/* Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition shadow-md"
//         >
//           Update Lesson
//         </button>
//       </form>
//     </div>
//   );
// }

import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams, useNavigate } from "react-router";
import LoadingSpinner from "../LoadingSpenner/LoadingSpenner";
import { useEffect } from "react";
import { imageUpload } from "../../Utils";
import useRole from "../../Hooks/useRole";
import { toast } from "react-toastify";

export default function UpdateLesson({ isPremiumUser }) {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPremium } = useRole();

  /* ================= Fetch lesson ================= */
  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  /* ================= Prefill ================= */
  useEffect(() => {
    if (lesson) {
      reset({
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        emotionalTone: lesson.emotionalTone,
        privacy: lesson.privacy,
        accessLevel: lesson.accessLevel,
      });
    }
  }, [lesson, reset]);

  /* ================= Submit ================= */
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

    let imageURL = lesson.image;
    if (image && image[0]) {
      try {
        imageURL = await imageUpload(image[0]);
      } catch {
        toast.error("Image upload failed!");
        return;
      }
    }

    try {
      await axiosSecure.put(`/lessons/${id}`, {
        title,
        description,
        category,
        emotionalTone,
        privacy,
        accessLevel,
        image: imageURL,
      });

      toast.success("Lesson updated successfully!");
      queryClient.invalidateQueries(["lesson", id]);
      navigate("/public-lessons");
    } catch {
      toast.error("Update failed!");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className="max-w-3xl mx-auto p-8 rounded-xl shadow-lg border
      bg-white dark:bg-gray-900
      border-gray-100 dark:border-gray-700
      text-gray-900 dark:text-gray-100"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">
        Update Life Lesson ✨
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="space-y-1">
          <label className="font-semibold">Lesson Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full p-3 rounded-lg border
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter lesson title"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="font-semibold">Full Description / Story</label>
          <textarea
            {...register("description", { required: true })}
            rows={5}
            className="w-full p-3 rounded-lg border
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write your updated story..."
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="font-semibold">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full p-3 rounded-lg border
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600"
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
          <label className="font-semibold">Emotional Tone</label>
          <select
            {...register("emotionalTone", { required: true })}
            className="w-full p-3 rounded-lg border
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600"
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
          <label className="font-semibold">Replace Image (Optional)</label>
          <input
            type="file"
            {...register("image")}
            className="w-full p-3 rounded-lg border cursor-pointer
              bg-gray-50 dark:bg-gray-800
              border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Privacy */}
        <div className="space-y-1">
          <label className="font-semibold">Privacy</label>
          <select
            {...register("privacy", { required: true })}
            className="w-full p-3 rounded-lg border
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Access Level */}
        <div className="space-y-1">
          <label className="font-semibold">Access Level</label>
          <select
            {...register("accessLevel", { required: true })}
            disabled={!isPremium}
            className={`w-full p-3 rounded-lg border
              ${
                !isPremium
                  ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800"
              }
              border-gray-300 dark:border-gray-600`}
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-lg font-semibold
            bg-blue-600 hover:bg-blue-700
            text-white transition shadow-md"
        >
          Update Lesson
        </button>
      </form>
    </div>
  );
}
