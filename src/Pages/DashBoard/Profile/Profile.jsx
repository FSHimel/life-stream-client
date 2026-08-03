import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaSave } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSeccure from "../../../Hooks/useAxiosSeccure";
import { useQuery } from "@tanstack/react-query";
import districts from "../../../../public/district.json";
import upazilas from "../../../../public/upazilas.json";
import Loading from "../../Loading/Loading";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Profile = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSeccure();

  const selectedDistrictId = watch("district");
  const filteredUpazilas = upazilas.filter(
    (upazila) => upazila.district_id === selectedDistrictId,
  );

  const [editing, setEditing] = useState(false);

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      //   console.log(res.data);
      return res.data;
    },
  });
  useEffect(() => {
    if (!userProfile) return;

    const district = districts.find((d) => d.name === userProfile.district);

    reset({
      name: userProfile.displayName,
      district: district?.id || "",
      upazila: userProfile.upazila,
      bloodGroup: userProfile.bloodGroup,
    });
  }, [userProfile, reset]);

  const handleOnSubmit = (data) => {
    // console.log(data);
    const selectedDistrict = districts.find(
      (district) => district.id === data.district,
    );
    // console.log(selectedDistrict);
  };

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Profile</h2>

          {!editing ? (
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              <FaEdit />
              Edit
            </button>
          ) : (
            <button className="btn btn-success" form="profileForm">
              <FaSave />
              Save Changes
            </button>
          )}
        </div>

        <div className="flex justify-center mb-8">
          <div className="avatar">
            <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={userProfile.photoURL} alt="" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}

            <div>
              <label className="label font-semibold">Name</label>

              <input
                className="input input-bordered w-full"
                disabled={!editing}
                {...register("name")}
              />
            </div>

            {/* Email */}

            <div>
              <label className="label font-semibold">Email</label>

              <input
                className="input input-bordered w-full"
                disabled
                value={user.email}
              />
            </div>

            {/* District */}

            <div>
              <label className="label font-semibold">District</label>

              <select
                defaultValue=""
                className="select select-bordered w-full"
                disabled={!editing}
                {...register("district")}
              >
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}

            <div>
              <label className="label font-semibold">Upazila</label>

              <select
                defaultValue=""
                className="select select-bordered w-full"
                disabled={!editing}
                {...register("upazila")}
              >
                {filteredUpazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Blood */}

            <div>
              <label className="label font-semibold">Blood Group</label>

              <select
                className="select select-bordered w-full"
                disabled={!editing}
                {...register("bloodGroup")}
              >
                {bloodGroups.map((group) => (
                  <option key={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* Avatar */}

            <div>
              <label className="label font-semibold">Avatar</label>

              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("photo")}
                disabled={!editing}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
