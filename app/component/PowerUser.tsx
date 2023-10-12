import { Link } from "@remix-run/react";

function PowerUser() {
  return (
    <div className="w-full text-center pb-10 bg-[#1d2d44]" id="contact">
      <img
        src="/assets/logo.png"
        className="w-24 md:w-[150px] mx-auto"
        alt="logo"
      />
      <h2 className="font-Elsie text-[2rem] md:text-[48px]">
        Become our Power User
      </h2>
      <p className="font-Inter max-w-[300px] md:max-w-[500px] mx-auto mb-6">
        Level up with MonlamAI's ML Models! Experience the revolution TODAY.
      </p>
      <Link to="/form" className="bg-[#3e5c76] px-4 py-2 rounded-md">
        Join Us
      </Link>
    </div>
  );
}

export default PowerUser;
