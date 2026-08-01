import { FaQuoteRight } from "react-icons/fa";
import thoughtIMG from "../../assets/thought.jfif";

const Thought = () => {
  return (
    <section className="bg-neutral text-neutral-content mt-20 rounded-3xl py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div>
            <img
              src={thoughtIMG}
              alt="Recipient"
              className="w-full max-w-md rounded-4xl object-cover shadow-2xl"
            />
          </div>

          {/* Right Content */}
          <div>
            <FaQuoteRight className="text-primary text-5xl mb-8" />

            <h2 className="text-3xl lg:text-4xl font-bold leading-relaxed italic">
              "Because of LifeStream and an anonymous donor, I was able to walk
              my daughter down the aisle just three months after my emergency.
              There are no words to describe the gratitude my family feels."
            </h2>

            <div className="mt-10">
              <h3 className="text-2xl font-bold text-primary">Sarah Jenkins</h3>

              <p className="text-neutral-content/70">
                Emergency Surgery Survivor
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Thought;
