import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import useAxiosSeccure from "../../Hooks/useAxiosSeccure";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSeccure = useAxiosSeccure();
  const { user } = useAuth();

  const {
    data: request,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const res = await axiosSeccure.get(`/donation-requests/single/${id}`);

      return res.data;
    },
  });

  const handleConfirmDonation = async (e) => {
    e.preventDefault();

    if (user.email === request.requesterEmail) {
      return Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "You are the requester. So, you can't accept this.",
      });
    }

    try {
      const res = await axiosSeccure.patch(
        `/donation-requests/${id}/inprogress`,
        {
          donorProfileImg: user.photoURL,
          donorName: user.displayName,
          donorEmail: user.email,
        },
      );

      if (res.data.modifiedCount > 0) {
        document.getElementById("donate_modal").close();

        await refetch();

        Swal.fire({
          icon: "success",
          title: "Donation Confirmed!",
          text: "Thank you for volunteering to donate blood.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Unable to confirm your donation.",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!request) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Donation request not found.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-secondary">
          Donation Request <span className="text-primary">Details</span>
        </h2>

        <p className="mt-2 text-gray-500">
          Please review the request information before donating.
        </p>
      </div>

      {/* Main Details */}

      <div className="bg-blue-50 border border-blue-100 shadow-lg rounded-2xl p-6 md:p-8">
        {/* Recipient */}

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-secondary">
            {request.recipientName}
          </h3>

          <span className="badge badge-error text-white text-sm p-3">
            {request.bloodGroup}
          </span>
        </div>

        <div className="divider"></div>

        {/* Request Information */}

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-gray-500">Requester Name</p>
            <p className="font-semibold">{request.requesterName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Requester Email</p>
            <p className="font-semibold">{request.requesterEmail}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Recipient Name</p>
            <p className="font-semibold">{request.recipientName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-semibold text-primary">{request.bloodGroup}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">District</p>
            <p className="font-semibold">{request.recipientDistrict}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Upazila</p>
            <p className="font-semibold">{request.recipientUpazila}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Hospital</p>
            <p className="font-semibold">{request.hospitalName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Donation Date</p>
            <p className="font-semibold">{request.donationDate}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Donation Time</p>
            <p className="font-semibold">{request.donationTime}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>

            <span
              className={`badge ${
                request.donationStatus === "pending"
                  ? "badge-warning"
                  : request.donationStatus === "inProgress"
                    ? "badge-info"
                    : request.donationStatus === "done"
                      ? "badge-success"
                      : "badge-error"
              }`}
            >
              {request.donationStatus}
            </span>
          </div>
        </div>

        {/* Address */}

        <div className="mt-6">
          <p className="text-sm text-gray-500">Full Address</p>

          <p className="font-semibold">{request.fullAddress}</p>
        </div>

        {/* Request Message */}

        <div className="mt-6">
          <p className="text-sm text-gray-500">Request Message</p>

          <div className="bg-white border border-gray-200 rounded-lg p-4 mt-1">
            {request.requestMessage}
          </div>
        </div>

        {/* Donate Button */}

        {request.donationStatus === "pending" && (
          <div className="flex justify-center mt-8">
            <button
              className="btn btn-primary px-10"
              onClick={() =>
                document.getElementById("donate_modal").showModal()
              }
            >
              Donate
            </button>
          </div>
        )}

        {/* Already in progress */}

        {request.donationStatus === "inProgress" && (
          <div className="alert alert-info mt-8">
            <span>This donation request is already in progress.</span>
          </div>
        )}
      </div>

      {/* Donate Modal */}

      <dialog id="donate_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-secondary">
            Confirm Donation
          </h3>

          <p className="py-3 text-gray-500">
            Please confirm that you want to donate blood for{" "}
            <span className="font-semibold">{request.recipientName}</span>.
          </p>

          <form onSubmit={handleConfirmDonation}>
            {/* Donor Name */}

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Donor Name</span>
              </label>

              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            {/* Donor Email */}

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Donor Email</span>
              </label>

              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            {/* Buttons */}

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("donate_modal").close()}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Confirm Donation
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DonationRequestDetails;
