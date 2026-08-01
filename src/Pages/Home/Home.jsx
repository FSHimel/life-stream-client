import Guide from "../../Components/Guide/Guide";
import Hero from "../../Components/Hero/Hero";
import Thought from "../../Components/Thought/Thought";

const Home = () => {
  return (
    <div className="space-y-10">
      <Hero></Hero>
      <Guide></Guide>
      <Thought></Thought>
    </div>
  );
};

export default Home;
