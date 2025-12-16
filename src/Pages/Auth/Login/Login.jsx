import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("User login Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-white dark:bg-gray-800 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
              Login now!
            </h1>
            <form onSubmit={handleSubmit(handleLogin)}>
              <fieldset className="fieldset">
                <label className="label text-gray-700 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email is required</p>
                )}

                <div className="relative mt-4">
                  <label className="label text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    {...register("password", { required: true, minLength: 6 })}
                    className="input bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    placeholder="Password"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute top-7 right-3 cursor-pointer text-gray-600 dark:text-gray-300"
                  >
                    {show ? (
                      <FaRegEye size={22} />
                    ) : (
                      <FaRegEyeSlash size={22} />
                    )}
                  </span>
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500">
                      Password must be 6 characters or longer.
                    </p>
                  )}
                </div>

                <div className="mt-2">
                  <a className="link link-hover text-blue-500 dark:text-blue-400">
                    Forgot password?
                  </a>
                </div>

                <button className="btn btn-neutral mt-4 w-full">Login</button>
              </fieldset>

              <p className="text-lg mt-4 text-gray-700 dark:text-gray-300">
                New to Digital Life Lessons?{" "}
                <Link
                  state={location.state}
                  to="/register"
                  className="text-lg text-red-500 underline"
                >
                  Register
                </Link>
              </p>
            </form>

            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
