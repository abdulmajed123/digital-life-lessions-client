import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    //intercepter request
    const reqIntercepter = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    // interceptors response

    const resInterceptors = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqIntercepter);
      axiosSecure.interceptors.response.eject(resInterceptors);
    };
  }, [user]);
  return axiosSecure;
};

export default useAxiosSecure;
