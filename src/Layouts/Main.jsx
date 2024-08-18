import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Main = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="min-h-[calc(100vh-200px)]">
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
