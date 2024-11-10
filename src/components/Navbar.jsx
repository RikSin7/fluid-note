import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-around items-center ~h-12/16 text-white bg-[#202020]">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/notes"}>Notes</NavLink>
    </div>
  );
}

export default Navbar;
