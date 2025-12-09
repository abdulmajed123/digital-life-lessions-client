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

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Digital Life Lessons</div>
        </nav>
        <Outlet></Outlet>
        {/* Page content here */}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home Page"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Home Page</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-lesson"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Lesson"
              >
                {/* Home icon */}

                <MdAddCircleOutline size={22} />
                <span className="is-drawer-close:hidden">Add Lesson</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-lessons"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Lessons"
              >
                {/* Home icon */}
                <MdLibraryBooks size={22} />
                <span className="is-drawer-close:hidden">My Lessons</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/my-favorite"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Favorite"
              >
                {/* Home icon */}
                <MdFavoriteBorder size={22} />
                <span className="is-drawer-close:hidden">My Favorite</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/manage-user"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage User"
              >
                {/* Home icon */}
                <FaUsers size={22} />
                <span className="is-drawer-close:hidden">Manage User</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-lesson"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Lessons"
              >
                {/* Home icon */}
                <FaBook size={22} />
                <span className="is-drawer-close:hidden">Manage Lessons</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/reported-lessons"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Reported Lessons"
              >
                {/* Home icon */}
                <FaExclamationTriangle size={22} />
                <span className="is-drawer-close:hidden">Reported Lessons</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                {/* Home icon */}
                <FaUserCircle size={22} />
                <span className="is-drawer-close:hidden">Profile</span>
              </Link>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
// import React from "react";
// import { FaUserCircle } from "react-icons/fa";
// import {
//   MdAddCircleOutline,
//   MdFavoriteBorder,
//   MdLibraryBooks,
// } from "react-icons/md";
// import { Link, Outlet, useLocation } from "react-router";

// const DashboardLayout = () => {
//   const { pathname } = useLocation();

//   const menuItems = [
//     { name: "Home Page", path: "/", icon: "home" },
//     {
//       name: "Add Lesson",
//       path: "/dashboard/add-lesson",
//       icon: <MdAddCircleOutline size={22} />,
//     },
//     {
//       name: "My Lessons",
//       path: "/dashboard/my-lessons",
//       icon: <MdLibraryBooks size={22} />,
//     },
//     {
//       name: "My Favorite",
//       path: "/dashboard/my-favorite",
//       icon: <MdFavoriteBorder size={22} />,
//     },
//     {
//       name: "Profile",
//       path: "/dashboard/profile",
//       icon: <FaUserCircle size={22} />,
//     },
//   ];

//   return (
//     <div className="drawer lg:drawer-open bg-base-200">
//       <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

//       {/* MAIN CONTENT */}
//       <div className="drawer-content flex flex-col">
//         {/* Top Navbar */}
//         <nav className="navbar bg-base-300 border-b border-base-300 shadow-sm">
//           <label
//             htmlFor="my-drawer-4"
//             className="btn btn-ghost btn-square drawer-button lg:hidden"
//           >
//             {/* Sidebar toggle icon */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </label>

//           <div className="flex-1 font-semibold text-lg">
//             Digital Life Lessons
//           </div>
//         </nav>

//         {/* Page Content */}
//         <div className="p-4">
//           <Outlet />
//         </div>
//       </div>

//       {/* SIDEBAR */}
//       <div className="drawer-side">
//         <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

//         <aside className="w-64 bg-base-100 border-r border-base-300 shadow-sm">
//           <div className="p-4 font-bold text-xl">Dashboard</div>

//           <ul className="menu px-4">
//             {menuItems.map((item, index) => (
//               <li key={index}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center gap-3 py-3 rounded-lg transition-all
//                     ${
//                       pathname === item.path
//                         ? "bg-primary text-white shadow-md"
//                         : "hover:bg-base-200"
//                     }
//                   `}
//                 >
//                   <span className="text-xl">{item.icon}</span>
//                   <span>{item.name}</span>
//                 </Link>
//               </li>
//             ))}

//             {/* Settings */}
//             <li className="mt-3">
//               <button className="flex items-center gap-3 py-3 hover:bg-base-200 rounded-lg">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="2"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M10 6h10M4 6h.01M10 12h10M4 12h.01M10 18h10M4 18h.01"
//                   />
//                 </svg>
//                 <span>Settings</span>
//               </button>
//             </li>
//           </ul>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
