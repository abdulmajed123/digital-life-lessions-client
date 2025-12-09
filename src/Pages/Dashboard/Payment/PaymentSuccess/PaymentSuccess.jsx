import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/users/make-premium?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <h2>Payment Successful! </h2>
    </div>
  );
};

export default PaymentSuccess;
