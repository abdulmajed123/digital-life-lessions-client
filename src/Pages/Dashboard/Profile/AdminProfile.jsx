import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { imageUpload } from "../../../Utils/index.js";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 1️⃣ Upload image to imgbb
      const imageUrl = await imageUpload(data.photo[0]);

      // 2️⃣ Update Firebase Auth
      await updateUserProfile(data.displayName, imageUrl);

      // 3️⃣ Update MongoDB
      await axiosSecure.patch("/users/update-profile", {
        email: user.email,
        displayName: data.displayName,
        photoURL: imageUrl,
      });

      toast.success("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.log("ERROR:", error);
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 text-center">
          <img
            src={user?.photoURL}
            className="w-28 h-28 rounded-full mx-auto border border-gray-300 dark:border-gray-600"
          />
          <h3 className="text-xl font-semibold mt-3">{user?.displayName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>

          <span className="inline-block mt-3 px-4 py-1 rounded-full bg-red-100 dark:bg-red-600 text-red-600 dark:text-red-100 font-semibold">
            Admin
          </span>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Update Profile</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <input
                defaultValue={user?.displayName}
                {...register("displayName", { required: true })}
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              {errors.displayName && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: true })}
                className="file-input file-input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>

            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Activity Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Lessons Moderated
            </p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl text-center">
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Actions Taken
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
