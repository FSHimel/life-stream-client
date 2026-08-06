import { useQuery } from "@tanstack/react-query";
import useAxiosSeccure from "../../../Hooks/useAxiosSeccure";
import Loading from "../../Loading/Loading";
import { useState } from "react";
import { FaUserCheck, FaUserShield, FaUserSlash } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSeccure = useAxiosSeccure();
  const [statusFilter, setStatusFilter] = useState("all");
  const {
    data: users = [],
    isLoading: usersLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", statusFilter],
    queryFn: async () => {
      const res = await axiosSeccure.get(`/users?status=${statusFilter}`);
      // console.log(res.data);
      return res.data;
    },
  });

  const handleToggleStatus = async (id) => {
    try {
      const res = await axiosSeccure.patch(`/users/${id}/status`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `User is now ${res.data.status}`,
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRole = async (id, role) => {
    try {
      const res = await axiosSeccure.patch(`/users/${id}/role`, {
        role,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `User is now ${role}.`,
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (usersLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="my-10 px-8">
      <h2 className="text-4xl text-secondary font-bold text-center">
        All The Users: <span className="text-primary">{users.length}</span>
      </h2>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="select select-bordered my-5"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {users?.map((user, index) => (
              <tr key={user._id}>
                {/* Serial */}
                <td>{index + 1}</td>

                {/* User Info */}
                <td>
                  <div className="flex text-start items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user?.photoURL} alt={user?.displayName} />
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">{user?.displayName}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td>
                  <span
                    className={`badge capitalize ${
                      user?.role === "admin"
                        ? "badge-secondary"
                        : user?.role === "volunteer"
                          ? "badge bg-amber-300"
                          : "badge-primary"
                    }`}
                  >
                    {user?.role}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`badge capitalize ${
                      user?.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {user?.status}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div
                    className={`dropdown ${
                      index >= users.length - 3
                        ? "dropdown-top dropdown-end"
                        : "dropdown-end"
                    }`}
                  >
                    <button
                      tabIndex={0}
                      className="btn btn-sm btn-circle btn-ghost hover:bg-base-200"
                    >
                      <FaEllipsisVertical className="text-lg" />
                    </button>

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-xl w-60 shadow-xl border p-2 z-50"
                    >
                      {user.status === "active" ? (
                        <li>
                          <button
                            onClick={() => handleToggleStatus(user._id)}
                            className="text-error"
                          >
                            <FaUserSlash />
                            Block User
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() => handleToggleStatus(user._id)}
                            className="text-success"
                          >
                            <FaUserCheck />
                            Unblock User
                          </button>
                        </li>
                      )}

                      {user.role === "donor" && user.status !== "blocked" && (
                        <li>
                          <button
                            onClick={() => handleRole(user._id, "volunteer")}
                          >
                            <FaUserCheck />
                            Make Volunteer
                          </button>
                        </li>
                      )}

                      {user.role !== "admin" && user.status !== "blocked" && (
                        <li>
                          <button
                            onClick={() => handleRole(user._id, "admin")}
                            className="text-primary"
                          >
                            <FaUserShield />
                            Make Admin
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
