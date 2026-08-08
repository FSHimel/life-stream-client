import axios from "axios";

const axiosPublicSecure = axios.create({
  baseURL: "https://life-stream-server-eight.vercel.app/",
});
const usePublicAxios = () => {
  return axiosPublicSecure;
};

export default usePublicAxios;
