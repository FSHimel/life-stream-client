import bloodDrop from "../../assets/bloodDrop.png";
const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={bloodDrop} alt="Logo" className="h-10 md:h-13" />
      <div className="-mt-2">
        <h1 className="text-primary md:text-xl font-bold">
          Life<span className="text-secondary">Stream</span>
        </h1>
        <p className="text-[8px] -mt-0.5">Every Drop Counts</p>
      </div>
    </div>
  );
};

export default Logo;
