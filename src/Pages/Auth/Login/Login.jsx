import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location?.state || "/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(handleLogin)}>
        <h2 className="text-4xl font-bold mb-8">Login</h2>

        <input
          className="input input-bordered w-full mb-4"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <p className="text-red-500 text-[10px]">Please enter your email...</p>
        )}

        <input
          type="password"
          className="input input-bordered w-full mb-6"
          {...register("password", { required: true, minLength: 6 })}
          placeholder="Password"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500 text-[10px]">
            Please enter your password...
          </p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500 text-[10px]">
            Password must be at least 6 characters or higher...
          </p>
        )}

        <button className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
