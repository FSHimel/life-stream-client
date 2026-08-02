const Login = () => {
  return (
    <div className="">
      <h2 className="text-4xl font-bold mb-8">Login</h2>

      <input className="input input-bordered w-full mb-4" placeholder="Email" />

      <input
        type="password"
        className="input input-bordered w-full mb-6"
        placeholder="Password"
      />

      <button className="btn btn-primary w-full">Login</button>
    </div>
  );
};

export default Login;
