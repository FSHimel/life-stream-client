import { BiDonateHeart } from "react-icons/bi";
import heroBG from "../../assets/heroBG.png";
import { BsAsterisk } from "react-icons/bs";
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
        <div className="relative z-10 h-full flex items-center justify-between p-10">
          <div>
            <h2 className="text-black text-4xl md:text-6xl font-bold gap-y-0.5">
              Save A Life,<br></br>
              <span className="text-primary">Give Blood</span>
            </h2>
            <p className="mt-5">
              Your single donation can save up to three lives.<br></br>Join our
              community of heroes and help us bridge<br></br>the gap between
              need and hope.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              {/* Donate Button */}
              <button className="btn bg-[#C1121F]/80 hover:bg-[#A50F1A] text-white border-none rounded-xl h-14 px-8 shadow-lg shadow-red-300/40 transition-all duration-300">
                <BiDonateHeart className="text-xl font-bold" />
                <span className="font-semibold">Donate Now</span>
              </button>

              {/* Request Button */}
              <button className="btn bg-white/10  hover:bg-red-50 text-[#C1121F] border border-[#C1121F]/40 rounded-xl h-14 px-8 transition-all duration-300">
                <BsAsterisk className="text-xl font-bold" />
                <span className="font-semibold">Request Blood</span>
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
