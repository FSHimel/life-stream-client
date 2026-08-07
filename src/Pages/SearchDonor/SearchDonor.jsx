import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import districts from "../../Data/district.json";
import upazilas from "../../Data/upazilas.json";
import useAxiosSeccure from "../../Hooks/useAxiosSeccure";
import Loading from "../Loading/Loading";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonor = () => {
  const axiosSeccure = useAxiosSeccure();

  const [filters, setFilters] = useState(null);

  const [bloodGroup, setBloodGroup] = useState(null);
  const [district, setDistrict] = useState(null);
  const [upazila, setUpazila] = useState(null);

  const { register, handleSubmit, watch } = useForm();

  const selectedDistrict = watch("district");

  const filteredUpazilas = upazilas.filter(
    (upazila) => upazila.district_id === selectedDistrict,
  );

  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["searchDonor", bloodGroup, district, upazila],
    enabled: !!filters,
    queryFn: async () => {
      const res = await axiosSeccure.get("/users/search", {
        params: {
          bloodGroup,
          district,
          upazila,
        },
      });
      console.log(res.data);

      return res.data;
    },
  });

  const onSubmit = (data) => {
    const selectedDistrict = districts.find(
      (district) => district.id === data.district,
    );
    setFilters(data);
    setBloodGroup(data.bloodGroup);
    setDistrict(selectedDistrict.name);
    setUpazila(data.upazila);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center text-secondary mb-10">
        Find <span className="text-primary">Blood</span> Donors
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-4 gap-5 bg-blue-50 border border-blue-100 shadow-lg p-6 rounded-xl"
      >
        {/* Blood Group */}

        <select
          className="select select-bordered w-full"
          {...register("bloodGroup")}
        >
          <option value="">Blood Group</option>

          {bloodGroups.map((group) => (
            <option key={group}>{group}</option>
          ))}
        </select>

        {/* District */}

        <select
          className="select select-bordered w-full"
          {...register("district")}
        >
          <option value="">District</option>

          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>

        {/* Upazila */}

        <select
          className="select select-bordered w-full"
          {...register("upazila")}
        >
          <option value="">Upazila</option>

          {filteredUpazilas.map((upazila) => (
            <option key={upazila.id} value={upazila.name}>
              {upazila.name}
            </option>
          ))}
        </select>

        <button className="btn btn-primary w-full">Search</button>
      </form>

      {/* Result */}

      <div className="overflow-x-auto mt-10 bg-blue-50 border border-blue-100 shadow-lg rounded-2xl">
        {donors.length === 0 ? (
          <p className="text-center py-8">No donor found.</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Donor</th>
                <th>Blood Group</th>
                <th>District</th>
                <th>Upazila</th>
              </tr>
            </thead>

            <tbody>
              {donors.map((donor, index) => (
                <tr key={donor._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex text-start items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={donor?.photoURL} alt={donor?.displayName} />
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold">{donor?.displayName}</p>
                      </div>
                    </div>
                  </td>

                  <td>{donor.bloodGroup}</td>

                  <td>{donor.district}</td>

                  <td>{donor.upazila}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SearchDonor;
