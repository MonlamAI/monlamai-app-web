import { Link } from "@remix-run/react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";

function TeamMember({ route, name, designation, headshot }) {
  let { translation, isTibetan } = uselitteraTranlation();

  return (
    <Link
      to={`/team/${route}`}
      state={{ name, designation, headshot }}
      className={`flex flex-col items-center px-4 py-6 text-center ${
        isTibetan ? "font-monlam leading-loose" : "font-poppins"
      }`}
    >
      <img
        src={"/assets/team/" + route + ".jpg"}
        alt={name}
        className="aspect-square w-52 rounded-full shadow-md p-2 mb-2 object-cover hover:scale-105 transition-all duration-500"
      />
      <h3
        className={`text-lg font-semibold ${isTibetan ? "leading-loose" : ""}`}
      >
        {name}
      </h3>
      <p
        className={`text-sm text-light_text-secondary dark:text-dark_text-secondary ${
          isTibetan ? "leading-loose" : ""
        }`}
      >
        {designation}
      </p>
    </Link>
  );
}

export default TeamMember;
