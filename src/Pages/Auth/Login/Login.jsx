import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link } from "react-router";

const Login = () => {
  const { signInUser } = useAuth();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center">Login now!</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500"> Email is required</p>
                )}
                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    {...register("password", { required: true, minLength: 6 })}
                    className="input"
                    placeholder="Password"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute top-7 right-3 cursor-pointer text-gray-600  dark:text-gray-300"
                  >
                    {show ? (
                      <FaRegEye size={22} />
                    ) : (
                      <FaRegEyeSlash size={22} />
                    )}
                  </span>
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500">
                      Password must be 6 character or longer.
                    </p>
                  )}
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
              <p className="text-lg">
                New to Digital life lessons?{" "}
                <Link
                  state={location.state}
                  to="/register"
                  className="text-lg text-red-500 underline "
                >
                  Register
                </Link>
              </p>
            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
