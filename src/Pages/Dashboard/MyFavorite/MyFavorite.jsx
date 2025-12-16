import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MyFavorite = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient(); // ✅ React Query client

  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");

  // Fetch favorite lessons
  const { data: favourites = [], isLoading } = useQuery({
    queryKey: ["favourite", user?.email, category, tone],
    queryFn: async () => {
      let url = `/favorites/${user.email}`;
      const params = [];
      if (category) params.push(`category=${category}`);
      if (tone) params.push(`emotionalTone=${tone}`);
      if (params.length) url += `?${params.join("&")}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Remove favorite lesson
  const handleRemove = async (id) => {
    try {
      const res = await axiosSecure.delete(`/favorites/${id}`);
      if (res.data.success) {
        toast.success("Removed from favorites");

        // ✅ update UI instantly
        queryClient.invalidateQueries([
          "favourite",
          user?.email,
          category,
          tone,
        ]);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove favorite");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          🌟 My Favorite Lessons
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl mb-6 shadow border dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          Filter Favorites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>

          <select
            className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="">All Emotional Tones</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th>Lesson Title</th>
              <th>Category</th>
              <th>Emotional Tone</th>
              <th>Creator</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {favourites.map((favourite) => (
              <tr
                key={favourite._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="font-semibold text-gray-800 dark:text-white">
                  {favourite.lessonTitle}
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {favourite.category}
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {favourite.emotionalTone}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={favourite.authorImage}
                      className="w-10 h-10 rounded-full object-cover"
                      alt="author"
                    />
                    <span className="text-gray-800 dark:text-gray-200">
                      {favourite.creator}
                    </span>
                  </div>
                </td>
                <td className="flex justify-center gap-2">
                  <button
                    onClick={() => handleRemove(favourite._id)}
                    className="btn btn-error btn-sm"
                  >
                    Remove
                  </button>
                  <Link
                    to={`/lesson/${favourite.lessonId}`}
                    className="btn btn-info btn-sm"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}

            {favourites.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No favorite lessons found 💔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorite;
