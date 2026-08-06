import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading/Loading";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSeccure from "../Hooks/useAxiosSeccure";

const AdminRoute = ({ children }) => {
  const { user, loading, logOut } = useAuth();
  const axiosSeccure = useAxiosSeccure()
  const location = useLocation();


  const { data: userProfile = [], isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSeccure.get(`/users/${user.email}`);
      // console.log(res.data);
      return res.data;
    },
  });
  if (loading || profileLoading) {
    return <Loading></Loading>;
  }
  if (userProfile.role !== "admin") {
    logOut()
  }
  return <Navigate to={"/auth"} state={location?.pathname}></Navigate>;
};

export default AdminRoute;
