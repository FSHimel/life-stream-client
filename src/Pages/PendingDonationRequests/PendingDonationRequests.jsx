import { useQuery } from "@tanstack/react-query";
import useAxiosSeccure from "../../Hooks/useAxiosSeccure";
import Loading from "../Loading/Loading";
import { Link } from "react-router";

const PendingDonationRequests = () => {
  const status = "pending";
  const axiosSeccure = useAxiosSeccure();
  const { data: donationReqs = [], isLoading } = useQuery({
    queryKey: ["donationReqs", status],
    queryFn: async () => {
      const res = await axiosSeccure.get(
        `/donation-requests/pending?status=${status}`,
      );
      // console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-4xl font-bold text-secondary text-center">
        All Pending <span className="text-primary">Blood</span> Donation
        Requests: <span className="text-primary">{donationReqs?.length}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {donationReqs.length === 0 ? (
          <p className="col-span-full text-center text-lg">
            No pending donation requests found.
          </p>
        ) : (
          donationReqs.map((request) => (
            <div
              key={request._id}
              className="card bg-blue-50 border border-blue-100 shadow-lg rounded-2xl hover:scale-[1.05] hover:shadow-2xl transition"
            >
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h2 className="card-title text-secondary">
                    {request.recipientName}
                  </h2>

                  <span className="badge badge-error text-white">
                    {request.bloodGroup}
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  <p>
                    <span className="font-semibold">📍 Location:</span>{" "}
                    {request.recipientUpazila}, {request.recipientDistrict}
                  </p>

                  <p>
                    <span className="font-semibold">📅 Date:</span>{" "}
                    {request.donationDate}
                  </p>

                  <p>
                    <span className="font-semibold">🕒 Time:</span>{" "}
                    {request.donationTime}
                  </p>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/donation-request-details/${request._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingDonationRequests;
