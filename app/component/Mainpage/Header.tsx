import { Link } from "@remix-run/react";
import React from "react";

function Header() {
  return (
    <div className=" w-full flex justify-around items-center max-w-6xl mx-auto text-lg">
      <div>
        <img src="/assets/logo.png" alt="logo" className="w-14 h-14" />
      </div>
      <Link to="/">Home</Link>
      <Link to="/models">Models</Link>
      <div>Login</div>
    </div>
  );
}

export default Header;
