import Contact from "../../Components/Contact/Contact";
import Guide from "../../Components/Guide/Guide";
import Hero from "../../Components/Hero/Hero";
import Thought from "../../Components/Thought/Thought";

const Home = () => {
  return (
    <div className="space-y-10">
      <Hero></Hero>
      <Guide></Guide> {/* explaining what is this website for */}
      <Thought></Thought> {/*One person is expressing her thought*/}
      <Contact></Contact>
    </div>
  );
};

export default Home;
