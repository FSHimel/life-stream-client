import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import Loading from "../Pages/Loading/Loading";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/auth"} state={location?.pathname}></Navigate>;
};

export default PrivetRoute;