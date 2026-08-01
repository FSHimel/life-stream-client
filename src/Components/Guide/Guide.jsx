import { FaUserPlus, FaHandHoldingHeart, FaHeart } from "react-icons/fa";
import guide1 from "../../assets/guide-1.jfif";
import guide2 from "../../assets/guide-2.jfif";
import guide3 from "../../assets/guide-3.jfif";

const steps = [
  {
    id: "1",
    title: "Register",
    icon: <FaUserPlus size={28} />,
    image: guide1,
    description:
      "Sign up online or at a local center. And a brief health screening ensures that you're ready to give.",
  },
  {
    id: "2",
    title: "Donate",
    icon: <FaHandHoldingHeart size={28} />,
    image: guide2,
    description:
      "Relax in our comfortable medical suites. The actual donation process takes only 8–10 minutes.",
  },
  {
    id: "3",
    title: "Save Lives",
    icon: <FaHeart size={28} />,
    image: guide3,
    description:
      "Your blood is tested and distributed to local hospitals, reaching those in critical need within hours.",
  },
];

const Guide = () => {
  return (
    <section>
      <div className="px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl text-secondary font-bold">
            The Journey of a Hero
          </h2>

          <p className="mt-5 text-black/60 text-lg">
            Three simple steps to make an eternal impact. We guide you through
            every moment of your donation experience.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row text-center h-full gap-10 mt-10">
          {steps.map((step) => (
            <div key={step.id} className="text-center relative">
              {/* Circle */}
              <div className="mx-auto w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-xl">
                {step.icon}
              </div>

              <h3 className="text-3xl text-secondary font-bold mt-6">
                {step.title}
              </h3>

              <p className="mt-4 text-black/70 leading-8 min-h-25">
                {step.description}
              </p>

              {/* Divider */}
              <div className="w-10 h-[2px] bg-black/30 mx-auto my-7"></div>

              {/* Image */}
              <img
                src={step.image}
                alt={step.title}
                className="rounded-3xl h-56 w-full object-cover shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guide;
