// import React from "react";
// import { Link, NavLink } from "react-router";
// import useAuth from "../../Hooks/useAuth";

// const Navbar = () => {
//   const { user, logOut } = useAuth();

//   const handleLogOut = () => {
//     logOut()
//       .then((result) => {
//         console.log(result.user);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   const links = (
//     <div className="flex items-center gap-3 text-lg">
//       <NavLink to="/">Home</NavLink>
//       <NavLink to="/add-lesson">Add Lesson</NavLink>
//       <NavLink>My Lessons</NavLink>
//       <NavLink>Public Lessons</NavLink>
//       <NavLink>pricing/upgrade</NavLink>
//     </div>
//   );
//   return (
//     <div className="navbar bg-base-100 shadow-sm">
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
//               {" "}
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />{" "}
//             </svg>
//           </div>
//           <ul
//             tabIndex="-1"
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//           >
//             {links}
//           </ul>
//         </div>
//         <a className="btn btn-ghost text-xl">daisyUI</a>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">{links}</ul>
//       </div>
//       <div className="navbar-end">
//         {user ? (
//           <Link onClick={handleLogOut} to="/register" className="btn ml-2">
//             Log Out
//           </Link>
//         ) : (
//           <Link to="/login" className="btn ">
//             Login
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const links = (
    <div className="flex items-center gap-3 text-lg">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/add-lesson">Add Lesson</NavLink>
      <NavLink to="/my-lessons">My Lessons</NavLink>
      <NavLink to="/public-lessons">Public Lessons</NavLink>
      <NavLink to="/pricing/upgrade">Pricing</NavLink>
    </div>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl">
          Life Lessons
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* RIGHT SIDE: Login / User Menu */}
      <div className="navbar-end relative">
        {!user ? (
          <Link to="/login" className="btn">
            Login
          </Link>
        ) : (
          <div className="relative">
            {/* User Photo */}
            <img
              src={user.photoURL}
              referrerPolicy="no-referrer"
              alt="User"
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full border cursor-pointer"
            />

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-base-100 shadow-lg rounded-lg p-4 z-50">
                <p className="font-semibold mb-2">{user.displayName}</p>
                <hr className="my-2" />

                <Link
                  to="/profile"
                  className="block py-1 hover:text-lime-600"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>

                <Link
                  to="/dashboard"
                  className="block py-1 hover:text-lime-600"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    handleLogOut();
                    setOpen(false);
                  }}
                  className="mt-3 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
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
