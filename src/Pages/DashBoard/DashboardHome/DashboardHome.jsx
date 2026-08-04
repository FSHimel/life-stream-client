import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSeccure from "../../../Hooks/useAxiosSeccure";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSeccure = useAxiosSeccure();

  const { data: myReqs = [] } = useQuery({
    queryKey: ["donationRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSeccure.get(
        `/donation-requests/${user.email}?limit=3`,
      );
      return res.data;
    },
  });
  return (
    <div className="p-8 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Welcome, {user?.displayName}! 👋
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Thank you for being a blood donor. Your willingness to donate blood
          can save lives. Manage your donation requests, update your profile,
          and continue making a difference in your community.
        </p>
      </div>
      <div className="mt-10">
        <h1 className="text-4xl font-bold text-secondary text-center">
          Your <span className="text-primary">{myReqs.length}</span> recent
          donation requests:
        </h1>
        <div className="overflow-x-auto mt-5">
          <table className="table">
            {/* head */}
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Recipient Location</th>
                <th>Donation Date</th>
                <th>Donation Time</th>
                <th>Blood Group</th>
                <th>Donation Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {myReqs.map((req, i) => (
                <tr key={req._id}>
                  <th>{i + 1}</th>
                  <td>{req.recipientName}</td>
                  <td>
                    <strong>District:</strong> {req.recipientDistrict},<br />
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
                  <td>{req.donationStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
