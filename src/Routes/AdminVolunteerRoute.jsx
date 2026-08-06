import Loading from "../Pages/Loading/Loading";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSeccure from "../Hooks/useAxiosSeccure";
import Swal from "sweetalert2";
import { Navigate } from "react-router";

const AdminVolunteerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosSeccure = useAxiosSeccure();

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
  if (!["admin", "volunteer"].includes(userProfile?.role)) {
    Swal.fire({
      icon: "error",
      title: "Forbidden Access",
      showConfirmButton: false,
      timer: 2500,
    });

    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminVolunteerRoute;
