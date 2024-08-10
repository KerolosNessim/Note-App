import { Outlet } from "react-router-dom";
import NavbarComp from "../NavbarComp/NavbarComp";

export default function Layout() {
  return<>
    <NavbarComp></NavbarComp>
    <div className="container my-3">
    <Outlet></Outlet>
    </div>
  </>;
}
