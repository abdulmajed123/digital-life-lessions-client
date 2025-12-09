import { AiFillLock } from "react-icons/ai";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Component/LoadingSpenner/LoadingSpenner";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isPending } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  // Example structure — API আসলে তোমার আসবে
  // const lessons = [
  //   {
  //     _id: 1,
  //     title: "The Power of Consistency",
  //     description:
  //       "Consistency shapes your future. One small step every day brings transformation...",
  //     category: "Personal Growth",
  //     emotionalTone: "Motivational",
  //     accessLevel: "Free",
  //     privacy: "Public",
  //     creatorName: "John Doe",
  //     creatorPhoto: "https://i.pravatar.cc/100?img=12",
  //     createdAt: "2025-01-20",
  //     image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  //   },
  //   {
  //     _id: 2,
  //     title: "Why Failure is the Best Teacher",
  //     description:
  //       "Every failure hides a lesson. Don’t fear mistakes — embrace them...",
  //     category: "Mindset",
  //     emotionalTone: "Realization",
  //     accessLevel: "Premium", // locked card example
  //     privacy: "Public",
  //     creatorName: "Anna Smith",
  //     creatorPhoto: "https://i.pravatar.cc/100?img=9",
  //     createdAt: "2025-01-18",
  //     image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  //   },
  // ];
  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  const currentUserIsPremium = false; // example

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p>{lessons.length}</p>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Browse Public Life Lessons
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => {
            const isLocked =
              lesson.accessLevel === "Premium" && !currentUserIsPremium;

            return (
              <div
                key={lesson._id}
                className="card bg-base-100 shadow-xl rounded-lg relative overflow-hidden"
              >
                {/* Card Image */}
                <div className="h-40 w-full">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className={`h-full w-full object-cover ${
                      isLocked ? "blur-md opacity-70" : ""
                    }`}
                  />
                </div>

                {/* Lock Overlay for Premium */}
                {isLocked && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white">
                    <AiFillLock size={40} className="mb-2" />
                    <p className="font-semibold text-center">
                      Premium Lesson — Upgrade to view
                    </p>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-lg line-clamp-1">
                    {lesson.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {lesson.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="badge badge-primary badge-sm">
                      {lesson.category}
                    </span>
                    <span className="badge badge-secondary badge-sm">
                      {lesson.emotionalTone}
                    </span>
                    <span
                      className={`badge badge-sm ${
                        lesson.accessLevel === "Premium"
                          ? "badge-accent"
                          : "badge-success"
                      }`}
                    >
                      {lesson.accessLevel}
                    </span>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center gap-3 mt-3">
                    <img
                      src={lesson.authorPhoto}
                      alt="creator"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {lesson.authorName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4">
                    {isLocked ? (
                      <button className="btn btn-outline btn-sm w-full">
                        Upgrade to Premium
                      </button>
                    ) : (
                      <Link
                        to={`/lesson/${lesson._id}`}
                        className="btn btn-primary btn-sm w-full"
                      >
                        See Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PublicLessons;
