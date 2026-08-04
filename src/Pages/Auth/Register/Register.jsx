import { useForm } from "react-hook-form";
import districts from "../../../../public/district.json";
import upazilas from "../../../../public/upazilas.json";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import useAxiosSeccure from "../../../Hooks/useAxiosSeccure";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import Loading from "../../Loading/Loading";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isRegistering, setIsRegistering] = useState(false);
  const { registerUser, updateUser } = useAuth();
  const axiosSeccure = useAxiosSeccure();
  const location = useLocation();
  const navigate = useNavigate();

  const password = watch("password");
  const selectedDistrictId = watch("district");
  const filteredUpazilas = upazilas.filter(
    (upazila) => upazila.district_id === selectedDistrictId,
  );

  const handleRegister = (data) => {
    setIsRegistering(true);
    const profileIMG = data.photo[0];
    registerUser(data.email, data.password).then(() => {
      // prepare form data for ImgBB
      const formData = new FormData();
      formData.append("image", profileIMG);

      const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PHOTO_HOST_KEY}`;

      axios
        .post(img_API_URL, formData)
        .then((res) => {
          const photoURL = res.data.data.url;

          const selectedDistrict = districts.find(
            (district) => district.id === data.district,
          );
          const userInfo = {
            displayName: data.name,
            email: data.email,
            photoURL: photoURL,
            bloodGroup: data.bloodGroup,
            districtId: selectedDistrict.id,
            district: selectedDistrict.name,
            upazila: data.upazila,
            status: "active",
            role: "donor",
          };

          axiosSeccure.post("/users", userInfo).then(() => {
            // if (res.data.insertedId) {
            //   console.log("User created in the database");
            // }
            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };
            updateUser(userProfile)
              .then(() => {
                navigate(location?.state || "/");
              })
              .catch((err) => {
                setIsRegistering(false);
                console.log(err);
              });
          });
        })

        .catch((err) => {
          setIsRegistering(false);
          console.log(err.response.data);
        });
    });
  };

  if (isRegistering) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-full max-w-xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
      <h2 className="text-4xl font-bold text-center text-secondary">
        Create Account
      </h2>

      <p className="text-center text-gray-500 mt-2 mb-8">
        Become a LifeStream Hero ❤️
      </p>

      <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
        {/* Name */}
        <div>
          <label className="label font-semibold">Your Name</label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500 text-[10px]">Name is required...</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-[10px]">Email is required...</p>
          )}
        </div>

        {/* Avatar */}
        <div>
          <label className="label font-semibold">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500 text-[10px]">Photo is required...</p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label className="label font-semibold">Blood Group</label>

          <select
            defaultValue=""
            className="select select-bordered w-full"
            {...register("bloodGroup", {
              required: "Blood Group is required",
            })}
          >
            <option value="" disabled>
              Select Blood Group
            </option>

            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* District + Upazila */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="label font-semibold">District</label>

            <select
              defaultValue=""
              className="select select-bordered w-full"
              {...register("district", {
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
          </div>

          <div>
            <label className="label font-semibold">Upazila</label>

            <select
              defaultValue=""
              className="select select-bordered w-full"
              {...register("upazila", {
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
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="label font-semibold">Password</label>

          <input
            type="password"
            placeholder="******"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="input input-bordered w-full"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-500 text-[10px]">
              Password must be at least 6 charecters or higher
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-[10px]">
              Password must be at least 6 characters or higher...
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="label font-semibold">Confirm Password</label>

          <input
            type="password"
            placeholder="******"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="input input-bordered w-full"
          />

          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full rounded-xl mt-4">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
