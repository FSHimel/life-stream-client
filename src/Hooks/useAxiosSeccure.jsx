import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://life-stream-server-eight.vercel.app/",
});
const useAxiosSeccure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //req interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await user?.getIdToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
    );

    //response interceptor

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.response.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/auth");
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);
  return axiosSecure;
};

export default useAxiosSeccure;
