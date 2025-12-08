import React from "react";

const MyLessonsUI = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📘 My Lessons</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>Lesson</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Stats</th>
              <th>Created</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Static Row Example */}
            <tr className="border-b">
              <td className="font-semibold">How I Learned Discipline</td>

              <td>
                <select className="select select-bordered select-sm">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </td>

              <td>
                <select
                  className="select select-bordered select-sm"
                  title="Only Premium users can select Premium"
                >
                  <option>Free</option>
                  <option>Premium</option>
                </select>
              </td>

              <td className="text-sm">❤️ 12 • ⭐ 5 • 💾 8</td>

              <td>2025-01-12</td>

              <td className="text-end space-x-2">
                <button className="btn btn-sm btn-neutral">Details</button>
                <button className="btn btn-sm btn-primary">Update</button>
                <button className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>

            {/* Another Row */}
            <tr className="border-b">
              <td className="font-semibold">Overcoming Failure in Career</td>

              <td>
                <select className="select select-bordered select-sm">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </td>

              <td>
                <select className="select select-bordered select-sm">
                  <option>Free</option>
                  <option>Premium</option>
                </select>
              </td>

              <td className="text-sm">❤️ 32 • ⭐ 18 • 💾 22</td>

              <td>2025-02-06</td>

              <td className="text-end space-x-2">
                <button className="btn btn-sm btn-neutral">Details</button>
                <button className="btn btn-sm btn-primary">Update</button>
                <button className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>

            {/* No Lesson Found */}
            {/* <tr>
              <td colSpan="6" className="text-center py-10 text-gray-500">
                No lessons found.
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLessonsUI;
