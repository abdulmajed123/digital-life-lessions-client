// import React from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
// import useAuth from "../../../Hooks/useAuth";
// import Swal from "sweetalert2";

// export default function ManageUsers() {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: users = [],
//     isPending,
//     refetch,
//   } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res.data;
//     },
//   });

//   const { data: userLessons = [] } = useQuery({
//     queryKey: ["my-lessons", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/users/create-lessons?email=${user?.email}`
//       );
//       return res.data;
//     },
//   });

//   const handleMakeAdmin = (user) => {
//     const roleInfo = {
//       role: "admin",
//     };
//     axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
//       if (res.data.modifiedCount) {
//         console.log(res.data);
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `${user.displayName} marekd as an Admin`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     });
//   };

//   const handleRemoveAdmin = (user) => {
//     const roleInfo = {
//       role: "user",
//     };
//     axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
//       if (res.data.modifiedCount) {
//         console.log(res.data);
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `${user.displayName} removed from Admin`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     });
//   };

//   if (isPending) return <LoadingSpinner></LoadingSpinner>;
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">👥 Manage Users</h2>

//       <div className="overflow-x-auto shadow rounded-lg bg-white">
//         <table className="min-w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Lessons Created</th>
//               <th className="p-3 text-end">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-b hover:bg-gray-50">
//                 <td className="p-3 font-medium">{user.displayName}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">{user.role}</td>
//                 <td className="p-3">{userLessons.length}</td>
//                 <td className="p-3 flex gap-2 justify-end">
//                   {user.role === "admin" && (
//                     <button
//                       onClick={() => handleRemoveAdmin(user)}
//                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       Remove
//                     </button>
//                   )}

//                   <button
//                     onClick={() => handleMakeAdmin(user)}
//                     className="px-3 py-1 bg-red-500 text-white rounded "
//                   >
//                     Promote
//                   </button>
//                   {/* {user.role === "Admin" ? (
//                     <button
//                       onClick={() => handleMakeAdmin(user)}
//                       className="px-3 py-1 bg-red-500 text-white rounded "
//                     >
//                       Removed
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleRemoveAdmin(user)}
//                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       Promote
//                     </button>
//                   )} */}
//                   <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Component/LoadingSpenner/LoadingSpenner";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // 🔥 All users lesson count state
  const [lessonCounts, setLessonCounts] = useState({});

  // 🔥 Load total lessons created for each user
  useEffect(() => {
    const loadCounts = async () => {
      let counts = {};
      for (let u of users) {
        const res = await axiosSecure.get(`/users/${u.email}/lessons-count`);
        counts[u.email] = res.data.total;
      }
      setLessonCounts(counts);
    };

    if (users.length > 0) {
      loadCounts();
    }
  }, [users, axiosSecure]);

  // 🔥 Promote user
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/${user._id}`, { role: "admin" }).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} promoted to Admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // 🔥 Remove admin role
  const handleRemoveAdmin = (user) => {
    axiosSecure.patch(`/users/${user._id}`, { role: "user" }).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} removed from Admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // 🔥 Delete account (optional)
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User account removed.", "success");
          }
        });
      }
    });
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">👥 Manage Users</h2>

      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Lessons Created</th>
              <th className="p-3 text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{user.displayName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>

                {/* 🔥 Total lessons created */}
                <td className="p-3">{lessonCounts[user.email] ?? 0}</td>

                <td className="p-3 flex gap-2 justify-end">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Promote
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
