import type { LoaderFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Button } from "flowbite-react";
import { TypeAnimation } from "react-type-animation";
import { auth } from "~/services/auth.server";
import { motion } from "framer-motion";
import ErrorMessage from "~/component/ErrorMessage";
import TranslationSwitcher from "~/component/TranslationSwitcher";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
export const loader: LoaderFunction = async ({ request }) => {
  const user = await auth.isAuthenticated(request, {
    successRedirect: "/",
  });
  return { user };
};

function login() {
  let sequence = [
    "Monlam AI",
    2000,
    "Neural Machine Translation",
    2000,
    "Text to Speech",
    2000,
    "OCR",
    2000,
    "སྨོན་ལམ་རིག་ནུས།",
    2000,
    "ཡིག་སྒྱུར་རིག་ནུས།",
    2000,
  ];

  const { translation, locale } = uselitteraTranlation();

  return (
    <div
      className="flex w-screen flex-col md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]
   min-h-[100dvh]"
    >
      <div
        className="relative hidden md:flex flex-1 flex-col justify-center px-5 pt-8 text-white
          md:bg-[url('/assets/back-light.gif')] bg-no-repeat bg-center bg-cover shadow-2xl"
      >
        <div className="w-full flex-1 flex justify-center items-center flex-col">
          <h1 className="text-center text-[40px]  md:text-[50px] max-w-[1000px] mb-2 ">
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
      <div className="flex grow flex-col gap-10 justify-center items-center rounded-t-[30px] md:rounded-none text-black p-6">
        <div className="absolute top-10 right-10">
          <TranslationSwitcher />
        </div>
        <div className="flex grow w-4/5 flex-col gap-8 justify-center items-center">
          <img src="/assets/buddha.png" alt="monalm" loading="lazy" />
          <div className="flex-col justify-center items-center ">
            <Form method="post" action="/auth0">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                  type="submit"
                  gradientDuoTone="purpleToBlue"
                  outline
                  pill
                  size="xs"
                >
                  <span
                    className={` leading-[normal] relative 
                    ${
                      locale === "en_US"
                        ? "font-poppins text-[1.4rem]"
                        : "font-monlam text-[1.2rem]"
                    }`}
                  >
                    {translation.login}
                  </span>
                </Button>
              </motion.div>
            </Form>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:mb-3">
          <div className="flex gap-2 items-center justify-center">
            <img
              src="/assets/logo.png"
              alt="Monalm AI"
              className=" relative -top-1 grayscale w-8 "
            />
            <p className="text-lg font-bold text-gray-500 tracking-wide ">
              Monlam AI
            </p>
          </div>
          <Link
            className="py-3 text-xs text-gray-400 hover:text-gray-500"
            to="/terms"
          >
            Terms of use
          </Link>
        </div>
      </div>
    </div>
  );
}

export default login;

export function ErrorBoundary({ error }) {
  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}
