import { Link } from "@remix-run/react";
import React from "react";

function TeamMember({ route, name, designation, headshot }) {
  return (
    // <Link
    //   to={`/team/${route}`}
    //   state={{ name, designation, headshot }}
    //   className="flex flex-col items-center px-4 py-6 text-center"
    // >
    <div className="flex flex-col items-center px-4 py-6 text-center">
      <img
        src="https://placehold.co/400x400/CCCCCC/333333?text=Profile"
        alt={name}
        className="w-56 h-56 rounded-full mb-2"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{designation}</p>
    </div>
    // </Link>
  );
}

export default TeamMember;
