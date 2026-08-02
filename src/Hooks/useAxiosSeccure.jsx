import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSeccure = () => {
  return axiosSecure;
};

export default useAxiosSeccure;
