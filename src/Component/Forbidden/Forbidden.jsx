// import React from "react";
// import { Link } from "react-router";
// import Animation from "../../../public/robotAnimation.json";

// const Forbidden = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center ">
//       <Animation></Animation>
//       <h2 className="text-3xl font-bold text-red-300">
//         You are Forbidden to Acceess This Page
//       </h2>
//       <p className="text-green-500">
//         Please contract the administrator if you believe this is on error
//       </p>
//       <div>
//         <Link to="/" className="btn btn-secondary text-primary mr-3">
//           Go to Home
//         </Link>
//         <Link to="/dashboard" className="btn btn-primary text-white">
//           Go to Dashbaord
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Forbidden;
import React from "react";
import { Link } from "react-router"; // react-router-dom ব্যবহার করুন
// import Lottie from "lottie-react";
// import animationData from "../../../public/robotAnimation.json";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      {/* Lottie Animation */}
      {/* <div className="w-80 h-80 mb-6">
        <Lottie animationData={animationData} loop={true} />
      </div> */}

      <h2 className="text-3xl font-bold text-red-500 mb-2">
        You are Forbidden to Access This Page
      </h2>
      <p className="text-green-600 mb-6 text-center">
        Please contact the administrator if you believe this is an error.
      </p>

      <div className="flex gap-3">
        <Link to="/" className="btn btn-secondary text-primary">
          Go to Home
        </Link>
        <Link to="/dashboard" className="btn btn-primary text-white">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
