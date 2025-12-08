import React from "react";

export default function ManageUsers() {
  const users = [
    {
      _id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      lessons: 5,
    },
    {
      _id: 2,
      name: "Sarah Khan",
      email: "sarah@example.com",
      role: "admin",
      lessons: 12,
    },
  ];

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
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">{user.lessons}</td>
                <td className="p-3 flex gap-2 justify-end">
                  {user.role !== "admin" && (
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Promote
                    </button>
                  )}
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
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
