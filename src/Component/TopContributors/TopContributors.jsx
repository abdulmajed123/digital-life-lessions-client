import React from "react";

export default function TopContributors() {
  const contributors = [
    {
      _id: 1,
      name: "Abdul Majid",
      email: "abdul@example.com",
      photo: "https://i.ibb.co/4pDNDk1/avatar.png",
      totalLessons: 18,
    },
    {
      _id: 2,
      name: "Sarah Ahmed",
      email: "sarah@example.com",
      photo: "https://i.ibb.co/4pDNDk1/avatar.png",
      totalLessons: 12,
    },
    {
      _id: 3,
      name: "Tanvir Hossain",
      email: "tanvir@example.com",
      photo: "https://i.ibb.co/4pDNDk1/avatar.png",
      totalLessons: 9,
    },
  ];

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🌟 Top Contributors of the Week
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {contributors.map((person, index) => (
          <div
            key={person._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100"
          >
            {/* Rank + Total Lessons */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
                🏆 Rank #{index + 1}
              </span>

              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {person.totalLessons} Lessons
              </span>
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center text-center gap-3">
              <img
                src={person.photo}
                className="w-20 h-20 rounded-full border shadow"
                alt="user avatar"
              />

              <h3 className="text-lg font-semibold text-gray-800">
                {person.name}
              </h3>

              <p className="text-sm text-gray-500">{person.email}</p>

              <div className="mt-3">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  ⭐ Top Contributor
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import LoadingSpinner from "../../Component/LoadingSpenner/LoadingSpenner";

// const TopContributors = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: contributors = [], isLoading } = useQuery({
//     queryKey: ["top-contributors-week"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/top-contributors-week");
//       return res.data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;

//   if (contributors.length === 0) return null;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-12">
//       <h2 className="text-3xl font-bold mb-6 text-center">
//         🌟 Top Contributors of the Week
//       </h2>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {contributors.map((user, index) => (
//           <div
//             key={user._id}
//             className="p-5 border rounded-2xl shadow-md bg-base-100 text-center"
//           >
//             <img
//               src={user.authorPhoto}
//               alt={user.authorName}
//               className="w-20 h-20 rounded-full mx-auto object-cover"
//             />

//             <h3 className="text-xl font-semibold mt-3">{user.authorName}</h3>

//             <p className="text-sm text-gray-500">
//               {user.totalLessons} lessons this week
//             </p>

//             <p className="mt-2 font-bold text-primary">
//               #{index + 1} Contributor
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopContributors;
