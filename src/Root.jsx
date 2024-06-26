import {Outlet} from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import {Fade} from "react-awesome-reveal";

export default function Root() {
  return (
    <>
      <NavBar></NavBar>
      <Fade>
        <div className="bg-base-100">
          <Outlet></Outlet>
        </div>
      </Fade>

      <Footer></Footer>
    </>
  );
}
