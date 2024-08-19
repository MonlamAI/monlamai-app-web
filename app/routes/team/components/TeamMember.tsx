import { Link } from "@remix-run/react";
import React from "react";

function TeamMember({ name, role, imageUrl }) {
  return (
    <Link to={`/team/${name}`} className="flex flex-col items-center px-4 py-6">
      <img src={imageUrl} alt={name} className="w-56 h-56 rounded-full mb-2" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{role}</p>
    </Link>
  );
}

export default TeamMember;
