import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col flex-1 w-full">
        <Navbar />

        <main className="flex-1 my-10">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default RootLayout;
