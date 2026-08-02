const Register = () => {
  return (
    <div className="">
      <h2 className="text-4xl font-bold mb-8">Register</h2>

      <input className="input input-bordered w-full mb-4" placeholder="Name" />

      <input className="input input-bordered w-full mb-4" placeholder="Email" />

      <input
        type="password"
        className="input input-bordered w-full mb-6"
        placeholder="Password"
      />

      <button className="btn btn-primary w-full">Register</button>
    </div>
  );
};

export default Register;
