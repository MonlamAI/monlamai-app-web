import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Form } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import type { LoaderFunction } from "@remix-run/node";
import { Button } from "flowbite-react";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await auth.isAuthenticated(request, {
    successRedirect: "/",
  });
  return { user };
};

function login() {
  let sequence = [
    "Monlam AI.",
    2000,
    "Neural Machine Translation.",
    2000,
    "Text to Speech.",
    2000,
    "OCR",
    2000,
    "སྨོན་ལམ་རིག་ནུས།",
    2000,
    "ཡིག་སྒྱུར་རིག་ནུས།",
    2000,
  ];
  return (
    <>
      <div
        className="flex w-screen flex-col md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]
   min-h-screen"
      >
        <div className="relative flex flex-1 flex-col justify-center px-5 pt-8 bg-[#1d2d44] text-white">
          <div className="w-full flex-1 flex justify-center items-center flex-col ">
            <h1 className="text-center text-[40px]  md:text-[50px] max-w-[1000px] mb-2">
              སྨོན་ལམ་རིག་ནུས།
            </h1>
            <TypeAnimation
              className="text-2xl md:text-3xl inline-block"
              sequence={sequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center rounded-t-[30px] md:rounded-none text-black p-6">
          <h1 className="text-xl font-extrabold  md:text-3xl">Get started</h1>
          <div className="flex-col justify-center items-center">
            <Form method="post" action="/auth0">
              <Button className="px-10" type="submit">
                Sign In
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default login;
