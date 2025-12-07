// import { useSearchParams } from "react-router";
// import { useEffect } from "react";
// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

// const PaymentSuccess = () => {
//   const axiosSecure = useAxiosSecure();
//   const [searchParams] = useSearchParams();
//   const email = searchParams.get("email");

//   const makePremium = async () => {
//     try {
//       await axiosSecure.patch("/users/make-premium", {
//         email,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     if (email) makePremium();
//   }, [email]);

//   return (
//     <div className="text-center mt-20">
//       <h1 className="text-3xl font-bold text-green-600">
//         Payment Successful 🎉
//       </h1>
//       <p className="mt-3">Your account has been upgraded to Premium.</p>
//     </div>
//   );
// };

// export default PaymentSuccess;
import { data, useSearchParams } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

export default function PaymentSuccess() {
  const axiosSecure = useAxiosSecure();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    axiosSecure
      .get(`/users/make-premium?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  return <h2>Payment Successful! 🎉</h2>;
}
