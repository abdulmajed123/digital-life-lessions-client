import React, { useState } from "react";

export default function MyFavorite() {
  const [favorites, setFavorites] = useState([
    {
      _id: "1",
      title: "How I Learned Discipline",
      category: "Self Growth",
      tone: "Motivational",
      creator: "John Doe",
      date: "2025-01-10",
    },
    {
      _id: "2",
      title: "Managing Stress in Life",
      category: "Mental Health",
      tone: "Calming",
      creator: "Sarah Khan",
      date: "2025-01-05",
    },
  ]);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");

  const handleRemove = (id) => {
    setFavorites(favorites.filter((item) => item._id !== id));
  };

  const filteredFavorites = favorites.filter((item) => {
    const matchCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    const matchTone = toneFilter ? item.tone === toneFilter : true;
    return matchCategory && matchTone;
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">❤️ My Favorites</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="select select-bordered"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Self Growth">Self Growth</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Career">Career</option>
        </select>

        <select
          className="select select-bordered"
          value={toneFilter}
          onChange={(e) => setToneFilter(e.target.value)}
        >
          <option value="">All Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Calming">Calming</option>
          <option value="Emotional">Emotional</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>Lesson</th>
              <th>Category</th>
              <th>Emotional Tone</th>
              <th>Creator</th>
              <th>Saved On</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFavorites.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="font-medium">{item.title}</td>
                <td>{item.category}</td>
                <td>{item.tone}</td>
                <td>{item.creator}</td>
                <td>{item.date}</td>

                <td className="text-end space-x-2">
                  <button className="btn btn-sm btn-neutral">Details</button>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
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
