// import { Check, X } from "lucide-react";
// import React from "react";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const PremiumPage = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const handleUpgrade = async () => {
//     const paymentInfo = {
//       email: user?.email,
//     };
//     try {
//       const res = await axiosSecure.post(
//         `/create-checkout-session`,
//         paymentInfo
//       );
//       console.log(res.data.url);
//       window.location.assign(res.data.url); // Stripe Checkout page
//     } catch (error) {
//       console.log(error);
//       alert("Failed to start payment.");
//     }
//   };

//   const isPremium = user?.isPremium;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Header */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold mb-2">Upgrade to Premium</h1>
//         <p className="text-gray-600 text-lg">
//           Lifetime Access – One-time payment of{" "}
//           <span className="font-semibold">৳1500</span>
//         </p>
//       </div>

//       {/* Free vs Premium Comparison Table */}
//       <div className="bg-white shadow rounded-lg p-6 mb-10">
//         <h2 className="text-2xl font-semibold mb-4 text-center">
//           Compare Plans
//         </h2>

//         <div className="grid grid-cols-3 font-semibold text-center py-3 border-b">
//           <div>Feature</div>
//           <div>Free</div>
//           <div className="text-yellow-600">Premium ⭐</div>
//         </div>

//         {[
//           ["Number of Lessons", "Limited", "Unlimited"],
//           ["Create Premium Lessons", <X />, <Check />],
//           ["Ad-Free Experience", <X />, <Check />],
//           ["Priority Listing", <X />, <Check />],
//           ["All Categories Access", "Limited", "Unlimited"],
//           ["Early Access Features", <X />, <Check />],
//           ["Exclusive Premium Badge", <X />, <Check />],
//           ["Support Level", "Basic", "Priority"],
//         ].map(([feature, free, premium], i) => (
//           <div
//             key={i}
//             className="grid grid-cols-3 text-center py-3 border-b last:border-none"
//           >
//             <div className="font-medium">{feature}</div>
//             <div className="text-gray-700 flex justify-center">{free}</div>
//             <div className="text-yellow-600 flex justify-center">{premium}</div>
//           </div>
//         ))}
//       </div>

//       {/* Checkout Card */}
//       {!isPremium ? (
//         <div className="bg-white shadow rounded-lg p-6 text-center">
//           <h3 className="text-2xl font-bold mb-4 text-yellow-600">
//             Premium ⭐
//           </h3>
//           <p className="text-gray-700 mb-4">Lifetime Access – ৳1500 Only</p>

//           <button
//             onClick={handleUpgrade}
//             className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg text-lg font-semibold transition"
//           >
//             Upgrade to Premium
//           </button>

//           <p className="text-sm text-gray-500 mt-3">
//             Secure Payment via Stripe
//           </p>
//         </div>
//       ) : (
//         <div className="bg-green-100 text-green-700 p-4 rounded text-center font-semibold">
//           You are already a Premium User! ⭐
//         </div>
//       )}
//     </div>
//   );
// };

// export default PremiumPage;

import { Check, X } from "lucide-react";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PremiumPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleUpgrade = async () => {
    const paymentInfo = { email: user?.email };
    try {
      const res = await axiosSecure.post(
        `/create-checkout-session`,
        paymentInfo
      );
      window.location.assign(res.data.url);
    } catch (error) {
      console.log(error);
      alert("Failed to start payment.");
    }
  };

  const isPremium = user?.isPremium;

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Upgrade to Premium</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Lifetime Access – One-time payment of{" "}
          <span className="font-semibold">৳1500</span>
        </p>
      </div>

      {/* Free vs Premium Comparison Table */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Compare Plans
        </h2>

        <div className="grid grid-cols-3 font-semibold text-center py-3 border-b border-gray-300 dark:border-gray-700">
          <div>Feature</div>
          <div>Free</div>
          <div className="text-yellow-600">Premium ⭐</div>
        </div>

        {[
          ["Number of Lessons", "Limited", "Unlimited"],
          ["Create Premium Lessons", <X />, <Check />],
          ["Ad-Free Experience", <X />, <Check />],
          ["Priority Listing", <X />, <Check />],
          ["All Categories Access", "Limited", "Unlimited"],
          ["Early Access Features", <X />, <Check />],
          ["Exclusive Premium Badge", <X />, <Check />],
          ["Support Level", "Basic", "Priority"],
        ].map(([feature, free, premium], i) => (
          <div
            key={i}
            className="grid grid-cols-3 text-center py-3 border-b last:border-none border-gray-300 dark:border-gray-700"
          >
            <div className="font-medium">{feature}</div>
            <div className="text-gray-700 dark:text-gray-300 flex justify-center">
              {free}
            </div>
            <div className="text-yellow-600 flex justify-center">{premium}</div>
          </div>
        ))}
      </div>

      {/* Checkout Card */}
      {!isPremium ? (
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold mb-4 text-yellow-600">
            Premium ⭐
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Lifetime Access – ৳1500 Only
          </p>

          <button
            onClick={handleUpgrade}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            Upgrade to Premium
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Secure Payment via Stripe
          </p>
        </div>
      ) : (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded text-center font-semibold">
          You are already a Premium User! ⭐
        </div>
      )}
    </div>
  );
};

export default PremiumPage;
