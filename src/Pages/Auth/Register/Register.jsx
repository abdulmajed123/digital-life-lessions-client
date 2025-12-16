import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { imageUpload } from "../../../Utils";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { name, email, photo, password } = data;
    const profileImage = photo[0];
    const photoURL = await imageUpload(profileImage);

    createUser(email, password)
      .then((result) => {
        const userInfo = {
          email,
          displayName: name,
          photoURL,
          role: "user",
          isPremium: false,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) console.log("User created in DB");
        });

        const userProfile = { displayName: name, photoURL };
        updateUserProfile(userProfile, photoURL)
          .then(() => {
            toast.success("User registered Successfully");
            navigate("/");
          })
          .catch(console.log);
      })
      .catch(console.log);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-white dark:bg-gray-800 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">
              Register Now!
            </h1>
            <form onSubmit={handleSubmit(handleRegister)}>
              <fieldset className="fieldset">
                <label className="label text-gray-700 dark:text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder="Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500">Name is required</p>
                )}

                <label className="label text-gray-700 dark:text-gray-200">
                  Photo
                </label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="input bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
                {errors.photo?.type === "required" && (
                  <p className="text-red-500">Photo is required</p>
                )}

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
                    {...register("password", {
                      required: true,
                      pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                    })}
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
                  {errors.password?.type === "required" && (
                    <p className="text-red-500">Password is required</p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500">
                      Password must contain at least 1 uppercase, 1 lowercase,
                      and be at least 6 characters long.
                    </p>
                  )}
                </div>

                <div className="mt-2">
                  <a className="link link-hover text-blue-500 dark:text-blue-400">
                    Forgot password?
                  </a>
                </div>

                <button className="btn btn-neutral mt-4 w-full">
                  Register
                </button>
              </fieldset>

              <p className="text-lg mt-4 text-gray-700 dark:text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 underline">
                  Login
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

export default Register;
