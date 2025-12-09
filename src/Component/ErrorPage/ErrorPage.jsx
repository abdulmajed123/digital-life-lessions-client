import React from "react";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-5">
      <h1 className="text-9xl font-extrabold text-indigo-600 mb-6">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
