// import React, { useState } from "react";
// import { Link, NavLink } from "react-router";
// import useAuth from "../../Hooks/useAuth";
// import image from "../../assets/image.png";
// import useRole from "../../Hooks/useRole";

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [open, setOpen] = useState(false);
//   const { isPremium, role } = useRole();
//   console.log(isPremium);

//   const handleLogOut = () => {
//     logOut()
//       .then(() => {})
//       .catch((error) => console.log(error));
//   };

//   const links = (
//     <div className="flex items-center gap-3 text-lg">
//       <NavLink to="/">Home</NavLink>
//       <NavLink to="/dashboard/add-lesson">Add Lesson</NavLink>
//       <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
//       <NavLink to="/public-lessons">Public Lessons</NavLink>
//       {user && (
//         <>
//           {isPremium === true ? (
//             <span className="text-yellow-600 font-semibold">Premium ⭐</span>
//           ) : (
//             <Link to="/premium" className="text-blue-600">
//               Upgrade
//             </Link>
//           )}
//         </>
//       )}
//     </div>
//   );

//   return (
//     <div className="navbar bg-base-100 shadow-sm">
//       {/* Mobile Menu */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>

//           <ul
//             tabIndex="-1"
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
//           >
//             {links}
//           </ul>
//         </div>

//         <Link to="/" className="btn btn-ghost text-xl">
//           <img src={image} className="w-10 h-10" alt="" />
//           Life Lessons
//         </Link>
//       </div>

//       {/* Desktop Menu */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">{links}</ul>
//       </div>

//       {/* RIGHT SIDE: Login / User Menu */}
//       <div className="navbar-end relative">
//         {!user ? (
//           <Link to="/login" className="btn">
//             Login
//           </Link>
//         ) : (
//           <div className="relative">
//             {/* User Photo */}
//             <img
//               src={user.photoURL}
//               referrerPolicy="no-referrer"
//               alt="User"
//               onClick={() => setOpen(!open)}
//               className="w-10 h-10 rounded-full border cursor-pointer"
//             />

//             {/* Dropdown Menu */}
//             {open && (
//               <div className="absolute right-0 mt-3 w-48 bg-base-100 shadow-lg rounded-lg p-4 z-50">
//                 <p className="font-semibold mb-2">{user.displayName}</p>
//                 <hr className="my-2" />
//                 {role && (
//                   <Link
//                     to={
//                       role === "admin" ? "/dashboard/admin-profile" : "/profile"
//                     }
//                     className="block py-1 hover:text-lime-600"
//                     onClick={() => setOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                 )}

//                 <Link
//                   to="/dashboard"
//                   className="block py-1 hover:text-lime-600"
//                   onClick={() => setOpen(false)}
//                 >
//                   Dashboard
//                 </Link>

//                 <button
//                   onClick={() => {
//                     handleLogOut();
//                     setOpen(false);
//                   }}
//                   className="mt-3 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
//                 >
//                   Log Out
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import image from "../../assets/image.png";
import useRole from "../../Hooks/useRole";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const { isPremium, role } = useRole();
  const { theme, setTheme } = useTheme();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-medium transition-colors ${
            isActive
              ? "bg-lime-600 text-white"
              : "hover:bg-lime-700 hover:text-white"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard/add-lesson"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-medium transition-colors ${
            isActive
              ? "bg-lime-600 text-white"
              : "hover:bg-lime-700 hover:text-white"
          }`
        }
      >
        Add Lesson
      </NavLink>

      <NavLink
        to="/dashboard/my-lessons"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-medium transition-colors ${
            isActive
              ? "bg-lime-600 text-white"
              : "hover:bg-lime-700 hover:text-white"
          }`
        }
      >
        My Lessons
      </NavLink>

      <NavLink
        to="/public-lessons"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-medium transition-colors ${
            isActive
              ? "bg-lime-600 text-white"
              : "hover:bg-lime-700 hover:text-white"
          }`
        }
      >
        Public Lessons
      </NavLink>

      {user && (
        <>
          {isPremium ? (
            <span className="px-3 py-2 text-yellow-400 font-semibold">
              Premium ⭐
            </span>
          ) : (
            <Link
              to="/premium"
              className="px-3 py-2 rounded-md text-blue-400 font-medium hover:text-blue-600 transition"
            >
              Upgrade
            </Link>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-black text-white shadow-md px-4 py-2">
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-compact dropdown-content bg-gray-800 rounded-lg mt-2 w-52 p-2 shadow-lg z-50"
          >
            {links}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <img src={image} className="w-10 h-10 rounded-full" alt="Logo" />
          <span className="text-xl font-bold">Life Lessons</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end relative">
        {!user ? (
          <Link
            to="/login"
            className="px-4 py-2 bg-lime-600 rounded-md font-medium hover:bg-lime-700 transition"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <img
              src={user.photoURL || image}
              referrerPolicy="no-referrer"
              alt="User"
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full border-2 border-lime-500 cursor-pointer"
            />
            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-gray-800 shadow-lg rounded-lg p-4 z-50">
                <p className="font-semibold text-white mb-2">
                  {user.displayName}
                </p>
                <hr className="border-gray-600 my-2" />
                {role && (
                  <Link
                    to={
                      role === "admin" ? "/dashboard/admin-profile" : "/profile"
                    }
                    className="block py-1 px-2 rounded hover:bg-lime-600 transition"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="block py-1 px-2 rounded hover:bg-lime-600 transition"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>

                <div>
                  <input
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                    type="checkbox"
                    defaultChecked
                    className="toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                  />
                </div>
                <button
                  onClick={() => {
                    handleLogOut();
                    setOpen(false);
                  }}
                  className="mt-3 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700 transition"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
