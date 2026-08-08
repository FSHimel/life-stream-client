import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSeccure from "../../../Hooks/useAxiosSeccure";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import Loading from "../../Loading/Loading";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSeccure = useAxiosSeccure();
  const navigate = useNavigate();

  const { data: userProfile = [], isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSeccure.get(`/users/${user.email}`);
      // console.log(res.data);
      return res.data;
    },
  });


  const {
    data: myReqs = [],
    refetch,
    isLoading: reqLoading,
  } = useQuery({
    queryKey: ["donationRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSeccure.get(
        `/donation-requests/${user.email}?limit=3`,
      );
      return res.data;
    },
  });

  const isAdminOrVolunteer =
    userProfile?.role === "admin" || userProfile?.role === "volunteer";

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    enabled: isAdminOrVolunteer,
    queryFn: async () => {
      const res = await axiosSeccure.get(`/users`);
      // console.log(res.data);
      return res.data;
    },
  });
  const { data: donationReqs = [], isLoading: donationReqLoading } = useQuery({
    queryKey: ["donationReqs"],
    enabled: isAdminOrVolunteer,
    queryFn: async () => {
      const res = await axiosSeccure.get(`/donation-requests`);
      // console.log(res.data);
      return res.data;
    },
  });

  const handleDone = (id) => {
    const updateStatus = {
      statusDone: "done",
    };
    axiosSeccure
      .patch(`/donation-requests/${id}/done`, updateStatus)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Your request is successfully done",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = (id) => {
    const updateStatus = {
      statusCanceled: "canceled",
    };
    Swal.fire({
      title: "Are you sure you want to cancel the request?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSeccure
          .patch(`/donation-requests/${id}/cancel`, updateStatus)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "You cancelled the request",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const handleReqDelet = (id) => {
    Swal.fire({
      title: "Are you sure you want to delet this request?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSeccure
          .delete(`/donation-requests/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
    });
  };

  const analyticsData = [
    {
      name: "Users",
      total: users.length,
      color: "#2563eb", // Blue
    },
    {
      name: "Requests",
      total: donationReqs.length,
      color: "#dc2626", // Red
    },
    {
      name: "Funding",
      total: 0,
      color: "#16a34a", // Green
    },
  ];

  if (
    reqLoading ||
    profileLoading ||
    (isAdminOrVolunteer && (usersLoading || donationReqLoading))
  ) {
    return <Loading />;
  }

  return (
    <div className="p-8 min-h-screen">
      <div
        className="relative overflow-hidden rounded-3xl p-8 text-white
      bg-linear-to-tr from-slate-900 via-blue-900 to-cyan-600
      shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-yellow-500">
          Welcome, {user?.displayName}! 👋
        </h1>

        <p className="mt-3 text-white text-lg">
          Thank you for being a blood donor. Your willingness to donate blood
          can save lives. Manage your donation requests, update your profile,
          and continue making a difference in your community.
        </p>
      </div>
      {userProfile?.role === "donor" && (
        <div>
          <div className="mt-10">
            <h1 className="text-4xl font-bold text-secondary text-center">
              Your <span className="text-primary">{myReqs.length}</span> recent
              donation requests:
            </h1>
            <div className="overflow-x-auto mt-5">
              <table className="table border border-gray-300">
                {/* head */}
                <thead className="text-center">
                  <tr>
                    <th>#</th>
                    <th>Recipient Name</th>
                    <th>Recipient Location</th>
                    <th>Donation Date</th>
                    <th>Donation Time</th>
                    <th>Blood Group</th>
                    <th>Donation Status</th>
                    <th>Actions</th>
                    <th>Donor</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {myReqs.map((req, i) => (
                    <tr key={req._id}>
                      <td>{i + 1}</td>
                      <td>{req.recipientName}</td>
                      <td>
                        <strong>District:</strong> {req.recipientDistrict},
                        <br />
                        <strong>Upazila:</strong>
                        {req.recipientUpazila}
                      </td>
                      <td>{req.donationDate}</td>
                      <td>
                        {new Date(
                          `1970-01-01T${req.donationTime}`,
                        ).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td>{req.bloodGroup}</td>
                      <td>
                        <p
                          className={`font-medium ${
                            req.donationStatus === "pending"
                              ? "text-gray-500"
                              : req.donationStatus === "inProgress"
                                ? "text-blue-600"
                                : req.donationStatus === "done"
                                  ? "text-green-600"
                                  : req.donationStatus === "canceled"
                                    ? "text-red-600"
                                    : ""
                          }`}
                        >
                          {req.donationStatus}
                        </p>
                      </td>
                      <td>
                        {req.donationStatus === "inProgress" && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center justify-center">
                            <button
                              onClick={() => handleDone(req._id)}
                              className="btn bg-success btn-sm"
                            >
                              Done
                            </button>

                            <button
                              onClick={() => handleCancel(req._id)}
                              className="btn btn-warning btn-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        )}

                        {req.donationStatus === "pending" && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center justify-center">
                            <button
                              onClick={() =>
                                navigate(`/dashboard/edit-request/${req._id}`)
                              }
                              className="btn bg-secondary/70 text-white btn-sm"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleReqDelet(req._id)}
                              className="btn bg-red-600 text-white btn-sm"
                            >
                              Delete
                            </button>
                          </div>
                        )}

                        {(req.donationStatus === "done" ||
                          req.donationStatus === "canceled") && (
                          <p className="text-center text-gray-500 font-medium italic">
                            No actions allowed
                          </p>
                        )}
                      </td>
                      <td>
                        {req.donationStatus === "pending" ? (
                          <p className="text-gray-500">
                            No one has accepted your request yet.
                          </p>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div className="text-start">
                              <div className="font-bold">Donor Name</div>
                              <div className="text-sm opacity-50">
                                donoremail@gmail.com
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <Link
              to={"/dashboard/my-donation-requests"}
              className="btn px-10 py-5 rounded-3xl bg-success text-black transition-all duration-500 ease-in-out hover:bg-secondary hover:text-white hover:scale-105"
            >
              View More ➡️
            </Link>
          </div>
        </div>
      )}

      {["admin", "volunteer"].includes(userProfile?.role) && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10 cally text-center">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-lg p-6">
              <div className="text-4xl">👥</div>
              <h2 className="text-gray-500 mt-2">Total Users</h2>
              <p className="text-4xl font-bold text-primary mt-2">
                {users.length}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-lg p-6">
              <div className="text-4xl">🩸</div>
              <h2 className="text-gray-500 mt-2">Donation Requests</h2>
              <p className="text-4xl font-bold text-secondary">
                {donationReqs.length}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-lg p-6">
              <div className="text-4xl">💰</div>
              <h2 className="text-gray-500 mt-2">Funding</h2>
              <p className="text-4xl font-bold">$0.00</p>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-center mb-8 text-secondary">
              Dashboard Overview
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                  {analyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
