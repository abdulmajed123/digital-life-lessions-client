import React from "react";
import {
  FaBook,
  FaExclamationTriangle,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import {
  MdAddCircleOutline,
  MdFavoriteBorder,
  MdLibraryBooks,
} from "react-icons/md";
import { Link, Outlet } from "react-router";
import useRole from "../Hooks/useRole";
import image from "../assets/image.png";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { role } = useRole();
  const { user } = useAuth();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-gray-800 dark:text-gray-200"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Digital Life Lessons
          </h1>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <aside className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
          {/* Logo */}
          <div className="flex items-center justify-center py-6 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center gap-2">
              <img src={image} className="w-10 h-auto" alt="Logo" />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Life Lessons
              </span>
            </Link>
          </div>

          {/* Menu Items */}
          <ul className="menu grow p-4 space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-lg text-gray-800 dark:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-gray-800 dark:text-gray-200"
                >
                  <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H5a2 2 0 0 1-2-2z" />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>

            {role === "user" && (
              <>
                <li>
                  <Link
                    to="/dashboard/add-lesson"
                    className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-lg text-gray-800 dark:text-gray-200"
                  >
                    <MdAddCircleOutline size={24} />
                    <span>Add Lesson</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my-lessons"
                    className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-lg text-gray-800 dark:text-gray-200"
                  >
                    <MdLibraryBooks size={24} />
                    <span>My Lessons</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my-favorite"
                    className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-lg text-gray-800 dark:text-gray-200"
                  >
                    <MdFavoriteBorder size={24} />
                    <span>My Favorite</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-lg text-gray-800 dark:text-gray-200"
                  >
                    <img
                      src={user?.photoURL}
                      className="rounded-full w-8 h-8"
                      alt=""
                    />
                    <span>Profile</span>
                  </Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/manage-user"
                    className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-lg text-gray-800 dark:text-gray-200"
                  >
                    <FaUsers size={24} />
                    <span>Manage User</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-lesson"
                    className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-lg text-gray-800 dark:text-gray-200"
                  >
                    <FaBook size={24} />
                    <span>Manage Lessons</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/reported-lessons"
                    className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-lg text-gray-800 dark:text-gray-200"
                  >
                    <FaExclamationTriangle size={24} />
                    <span>Reported Lessons</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/admin-profile"
                    className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-lg text-gray-800 dark:text-gray-200"
                  >
                    <FaUserCircle size={24} />
                    <span>Admin Profile</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
