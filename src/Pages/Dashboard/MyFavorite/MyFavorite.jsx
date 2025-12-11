import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
import { toast } from "react-toastify";

const MyFavorite = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: favourites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["favourite", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
  });

  const handleRemove = async (id) => {
    try {
      const res = await axiosSecure.delete(`/favorites/${id}`);

      if (res.data.success) {
        toast.success("Removed from favorites");
        refetch(); // refetch data after deletion
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove favorite");
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">🌟 My Favorite Lessons</h1>
      </div>

      {/* Filters */}
      <div className="bg-base-200 p-4 rounded-xl mb-6">
        <h2 className="text-lg font-semibold mb-3">Filter Favorites</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="select select-bordered w-full">
            <option disabled selected>
              Filter by Category
            </option>
            <option>Gratitude</option>
            <option>Mistakes Learned</option>
            <option>Life Lessons</option>
            <option>Success</option>
          </select>

          <select className="select select-bordered w-full">
            <option disabled selected>
              Filter by Emotional Tone
            </option>
            <option>Happy</option>
            <option>Sad</option>
            <option>Grateful</option>
            <option>Motivated</option>
          </select>

          <button className="btn btn-primary">Apply Filters</button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-base-300 text-base font-bold">
            <tr>
              <th>Lesson Title</th>
              <th>Category</th>
              <th>Emotional Tone</th>
              <th>Creator</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {favourites.map((favourite) => (
              <tr>
                <td className="font-semibold">{favourite.lessonTitle}</td>
                <td>{favourite.category}</td>
                <td>{favourite.emotionalTone}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={favourite.authorImage}
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{favourite.creator}</span>
                  </div>
                </td>

                <td className="flex justify-center gap-2">
                  <button
                    onClick={() => handleRemove(favourite._id)}
                    className="btn btn-error btn-sm"
                  >
                    Remove
                  </button>
                  <button className="btn btn-info btn-sm">Details</button>
                  {/* <Link
                    to={`/lesson/${favourite.lessonId}`} // lessonId backend থেকে লাগবে
                    className="btn btn-info btn-sm"
                  >
                    Details
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorite;
