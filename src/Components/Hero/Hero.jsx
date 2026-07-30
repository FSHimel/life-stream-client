import heroBG from "../../assets/heroBG.png";
const Hero = () => {
  return (
    <div>
      <section
        className=" bg-cover bg-center bg-no-repeat relative rounded-3xl h-150"
        style={{
          backgroundImage: `url(${heroBG})`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-white/70 rounded-3xl"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between p-10 min-h-screen">
          <div>
            <h2 className="text-black text-4xl font-bold gap-y-0.5">
              Save A Life,<br></br>
              <span className="text-primary">Give Blood</span>
            </h2>
          </div>
          <div className="h-80 w-80 bg-black"></div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
