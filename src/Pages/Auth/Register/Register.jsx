import React, { useState } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link } from "react-router";

const Register = () => {
  const { createUser } = useAuth();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-5xl font-bold">Register Now!</h1>
              <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="input"
                    placeholder="Name"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-500">Name is required</p>
                  )}
                  <label className="label">Photo</label>
                  <input
                    type="file"
                    {...register("photo", { required: true })}
                    className="input"
                    placeholder="Email"
                  />
                  {errors.photo?.type === "required" && (
                    <p className="text-red-500">Photo is required</p>
                  )}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="input"
                    placeholder="Email"
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-500">Email is required</p>
                  )}
                  <div className="relative">
                    <label className="label">Password</label>
                    <input
                      type={show ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                      })}
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
                    {errors.password?.type === "required" && (
                      <p className="text-red-500">Password is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-red-500">
                        Password must be 6 character or longer.
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-500">
                        Password must contain at least 1 uppercase, 1 lowercase,
                        1 number and be at least 6 characters long.
                      </p>
                    )}
                  </div>

                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p className="text-lg">
                  Already have an account?{" "}
                  <Link
                    // state={location.state}
                    to="/login"
                    className="text-lg text-red-500 underline "
                  >
                    Login
                  </Link>
                </p>
              </form>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
