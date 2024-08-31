import { Link } from "@remix-run/react";
import React from "react";

function TeamMember({ route, name, designation, headshot }) {
  return (
    <Link
      to={`/team/${route}`}
      state={{ name, designation, headshot }}
      className="flex flex-col items-center px-4 py-6 text-center"
    >
      <img
        src={"/assets/team/" + route + ".jpg"}
        alt={name}
        className="aspect-square w-52 rounded-full mb-2 object-cover"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-light_text-secondary dark:text-dark_text-secondary">
        {designation}
      </p>
    </Link>
  );
}

export default TeamMember;
