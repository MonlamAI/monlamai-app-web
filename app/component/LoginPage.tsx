import { Link } from "@remix-run/react";
import React from "react";

function LoginPage() {
  return (
    <Link to="/tool" className="bg-red-300">
      login
    </Link>
  );
}

export default LoginPage;
