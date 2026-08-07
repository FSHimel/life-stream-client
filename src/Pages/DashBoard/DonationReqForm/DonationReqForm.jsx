import { useForm } from "react-hook-form";
import districts from "../../../Data/district.json";
import upazilas from "../../../Data/upazilas.json";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSeccure from "../../../Hooks/useAxiosSeccure";
import Logo from "../../../Components/Logo/Logo";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonationReqForm = () => {
  const { user } = useAuth();
  const axiosSeccure = useAxiosSeccure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedDistrict = watch("recipientDistrict");

  const filteredUpazilas = upazilas.filter(
    (upazila) => upazila.district_id === selectedDistrict,
  );

  const handleFormSubmit = async (data) => {
    const district = districts.find((d) => d.id === data.recipientDistrict);

    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,

      recipientName: data.recipientName,
      recipientDistrict: district?.name,
      recipientUpazila: data.recipientUpazila,

      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,

      bloodGroup: data.bloodGroup,

      donationDate: data.donationDate,
      donationTime: data.donationTime,

      requestMessage: data.requestMessage,

      donationStatus: "pending",
      createdAt: new Date(),
    };

    axiosSeccure
      .post("/donation-requests", donationRequest)
      .then((res) => {
        if (res.data.insertedId) {
          reset();
          Swal.fire({
            icon: "success",
            title: "Donation Request Posted Successfully",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-5xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl shadow-lg p-8 my-10">
      <div className="mb-8 flex flex-col items-center">
        <Logo></Logo>
        <h2 className="text-4xl font-bold text-center text-primary">
          Create Donation Request
        </h2>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          {/* Requester Name */}
          <div>
            <label className="label font-semibold">Requester Name</label>

            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Requester Email */}
          <div>
            <label className="label font-semibold">Requester Email</label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className="label font-semibold">Recipient Name</label>

            <input
              type="text"
              placeholder="Recipient Name"
              className="input input-bordered w-full"
              {...register("recipientName", {
                required: "Recipient name is required",
              })}
            />

            <p className="text-error text-sm mt-1">
              {errors.recipientName?.message}
            </p>
          </div>

          {/* District */}
          <div>
            <label className="label font-semibold">Recipient District</label>

            <select
              className="select select-bordered w-full"
              defaultValue=""
              {...register("recipientDistrict", {
                required: "District is required",
              })}
            >
              <option value="" disabled>
                Select District
              </option>

              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>

            <p className="text-error text-sm mt-1">
              {errors.recipientDistrict?.message}
            </p>
          </div>

          {/* Upazila */}
          <div>
            <label className="label font-semibold">Recipient Upazila</label>

            <select
              className="select select-bordered w-full"
              defaultValue=""
              {...register("recipientUpazila", {
                required: "Upazila is required",
              })}
            >
              <option value="" disabled>
                Select Upazila
              </option>

              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>

            <p className="text-error text-sm mt-1">
              {errors.recipientUpazila?.message}
            </p>
          </div>

          {/* Hospital */}
          <div>
            <label className="label font-semibold">Hospital Name</label>

            <input
              type="text"
              placeholder="Hospital Name"
              className="input input-bordered w-full"
              {...register("hospitalName", {
                required: "Hospital name is required",
              })}
            />

            <p className="text-error text-sm mt-1">
              {errors.hospitalName?.message}
            </p>
          </div>

          {/* Full Address */}
          <div>
            <label className="label font-semibold">Full Address</label>

            <input
              type="text"
              placeholder="Full Address"
              className="input input-bordered w-full"
              {...register("fullAddress", {
                required: "Address is required",
              })}
            />

            <p className="text-error text-sm mt-1">
              {errors.fullAddress?.message}
            </p>
          </div>

          {/* Blood Group */}
          <div>
            <label className="label font-semibold">Blood Group</label>

            <select
              className="select select-bordered w-full"
              defaultValue=""
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
            >
              <option value="" disabled>
                Select Blood Group
              </option>

              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <p className="text-error text-sm mt-1">
              {errors.bloodGroup?.message}
            </p>
          </div>

          {/* Donation Date */}
          <div>
            <label className="label font-semibold">Donation Date</label>

            <input
              type="date"
              className="input input-bordered w-full"
              {...register("donationDate", {
                required: "Donation date is required",
              })}
            />

            <p className="text-error text-sm mt-1">
              {errors.donationDate?.message}
            </p>
          </div>

          {/* Donation Time */}
          <div>
            <label className="label font-semibold">Donation Time</label>

            <input
              type="time"
              className="input input-bordered w-full"
              {...register("donationTime", {
                required: "Donation time is required",
              })}
            />

            <p className="text-error text-sm mt-1">
              {errors.donationTime?.message}
            </p>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="label font-semibold">Request Message</label>

            <textarea
              rows={6}
              placeholder="Explain why blood is needed..."
              className="textarea textarea-bordered w-full"
              {...register("requestMessage", {
                required: "Request message is required",
              })}
            ></textarea>

            <p className="text-error text-sm mt-1">
              {errors.requestMessage?.message}
            </p>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-8">
          Request
        </button>
      </form>
    </div>
  );
};

export default DonationReqForm;
