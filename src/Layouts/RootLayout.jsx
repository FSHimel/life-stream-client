import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col">
        <Navbar></Navbar>
        <div className="my-10 flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
