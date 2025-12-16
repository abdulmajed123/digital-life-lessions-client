import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpenner/LoadingSpenner";
import { motion } from "framer-motion";

export default function TopContributorsWeekly() {
  const axiosSecure = useAxiosSecure();

  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["topContributorsWeekly"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-contributors-weekly");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (contributors.length === 0)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
        No contributors this week
      </p>
    );

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    }),
  };

  return (
    <section className="my-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        🌟 Top Contributors of the Week
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {contributors.map((person, index) => (
          <motion.div
            key={person._id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center pt-12"
          >
            {/* Profile Image */}
            <div className="absolute -mt-12">
              <img
                src={
                  person.authorPhoto || "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={person.authorName}
                className="w-24 h-24 object-contain rounded-full border-4 border-lime-500 dark:border-lime-400 shadow-md bg-white dark:bg-gray-700 p-1"
              />
            </div>

            <div className="px-6 pb-6 text-center space-y-2 mt-12">
              {/* Name */}
              <h3 className="font-bold text-lg line-clamp-1 text-gray-900 dark:text-white">
                {person.authorName}
              </h3>

              {/* Stats */}
              <div className="flex gap-2 justify-center flex-wrap mt-2">
                <span className="badge badge-primary badge-sm">
                  🏆 Rank #{index + 1}
                </span>
                <span className="badge badge-secondary badge-sm">
                  {person.totalLessons} Lessons
                </span>
                <span className="badge badge-accent badge-sm">
                  ❤️ {person.totalLikes}
                </span>
              </div>

              {/* Author ID */}
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {person._id}
              </p>

              {/* Weekly Contributor Badge */}
              <span className="badge badge-info badge-sm mt-2">
                ⭐ Weekly Top Contributor
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
