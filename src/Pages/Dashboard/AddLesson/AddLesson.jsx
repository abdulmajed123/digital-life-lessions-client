// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// // import toast from "react-hot-toast";

// const AddLesson = ({ currentUser }) => {
//   const { register, handleSubmit, reset } = useForm();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);

//     // Image handling (optional)
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("category", data.category);
//     formData.append("emotionalTone", data.emotionalTone);
//     formData.append("privacy", data.privacy);
//     formData.append("accessLevel", data.accessLevel);
//     if (data.image && data.image[0]) {
//       formData.append("image", data.image[0]);
//     }

//     try {
//       // Replace with your API endpoint
//       const response = await fetch("/api/lessons", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Failed to create lesson");

//       toast.success("Lesson created successfully!");
//       reset();
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Conditional Access Level handling
//   const isPremiumUser = currentUser?.isPremium;
//   // const accessLevel = watch("accessLevel");

//   return (
//     <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Add New Life Lesson</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Lesson Title */}
//         <div>
//           <label className="block mb-1 font-semibold">Lesson Title</label>
//           <input
//             type="text"
//             {...register("title", { required: true })}
//             className="w-full border p-2 rounded"
//             placeholder="Enter lesson title"
//           />
//         </div>

//         {/* Full Description */}
//         <div>
//           <label className="block mb-1 font-semibold">
//             Full Description / Story
//           </label>
//           <textarea
//             {...register("description", { required: true })}
//             rows={6}
//             className="w-full border p-2 rounded"
//             placeholder="Write your lesson here..."
//           ></textarea>
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block mb-1 font-semibold">Category</label>
//           <select
//             {...register("category", { required: true })}
//             className="w-full border p-2 rounded"
//           >
//             <option value="">Select category</option>
//             <option value="Personal Growth">Personal Growth</option>
//             <option value="Career">Career</option>
//             <option value="Relationships">Relationships</option>
//             <option value="Mindset">Mindset</option>
//             <option value="Mistakes Learned">Mistakes Learned</option>
//           </select>
//         </div>

//         {/* Emotional Tone */}
//         <div>
//           <label className="block mb-1 font-semibold">Emotional Tone</label>
//           <select
//             {...register("emotionalTone", { required: true })}
//             className="w-full border p-2 rounded"
//           >
//             <option value="">Select emotional tone</option>
//             <option value="Motivational">Motivational</option>
//             <option value="Sad">Sad</option>
//             <option value="Realization">Realization</option>
//             <option value="Gratitude">Gratitude</option>
//           </select>
//         </div>

//         {/* Image (Optional) */}
//         <div>
//           <label className="block mb-1 font-semibold">Image (Optional)</label>
//           <input
//             type="file"
//             {...register("image")}
//             accept="image/*"
//             className="w-full"
//           />
//         </div>

//         {/* Privacy */}
//         <div>
//           <label className="block mb-1 font-semibold">Privacy</label>
//           <select
//             {...register("privacy", { required: true })}
//             className="w-full border p-2 rounded"
//           >
//             <option value="Public">Public</option>
//             <option value="Private">Private</option>
//           </select>
//         </div>

//         {/* Access Level */}
//         <div>
//           <label className="block mb-1 font-semibold">Access Level</label>
//           <select
//             {...register("accessLevel", { required: true })}
//             className={`w-full border p-2 rounded ${
//               !isPremiumUser ? "bg-gray-100 cursor-not-allowed" : ""
//             }`}
//             disabled={!isPremiumUser}
//             title={
//               !isPremiumUser ? "Upgrade to Premium to create paid lessons" : ""
//             }
//           >
//             <option value="Free">Free</option>
//             <option value="Premium">Premium</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {isSubmitting ? "Submitting..." : "Create Lesson"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddLesson;

import React from "react";
import { useForm } from "react-hook-form";

const AddLessonForm = ({ currentUser }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // শুধু ডাটা দেখানোর জন্য
  };

  const isPremiumUser = currentUser?.isPremium;

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Life Lesson</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Lesson Title */}
        <div>
          <label className="font-semibold">Lesson Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter lesson title"
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="font-semibold">Full Description / Story</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border p-2 rounded"
            rows={5}
            placeholder="Write your story..."
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full border p-2 rounded"
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
        <div>
          <label className="font-semibold">Emotional Tone</label>
          <select
            {...register("emotionalTone", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Emotional Tone</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="font-semibold">Image (Optional)</label>
          <input
            type="file"
            {...register("image")}
            accept="image/*"
            className="w-full"
          />
        </div>

        {/* Privacy */}
        <div>
          <label className="font-semibold">Privacy</label>
          <select
            {...register("privacy", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Access Level */}
        <div>
          <label className="font-semibold">Access Level</label>
          <select
            {...register("accessLevel", { required: true })}
            className="w-full border p-2 rounded disabled:bg-gray-200"
            disabled={!isPremiumUser}
            title={
              !isPremiumUser ? "Upgrade to Premium to create paid lessons" : ""
            }
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLessonForm;
