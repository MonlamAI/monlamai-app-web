import { useLoaderData } from "@remix-run/react";
import { useRef } from "react";
import { useAuth0 } from "./hooks/useAuth";
// import { FcGoogle } from "react-icons/fc";
// If the user lands on this page, we redirect back to / if they are already logged in.

// This form would take us to the auth0 route, which would redirect to the Auth0 login page.

export default function Login() {
  let loginRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button onClick={() => loginRef.current?.showModal()}>
        <i className="fas fa-user mr-2"></i>ནང་འཛུལ།
      </button>
      <dialog ref={loginRef} className="modal">
        <div className="modal-box">
          <LoginForm />
        </div>
        <form
          method="dialog"
          className="transition-all duration-75 backdrop-blur-sm modal-backdrop  "
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

function LoginForm() {
  let { env } = useLoaderData();
  let { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV } = env;
  let location =
    NODE_ENV === "production" ? "https://pecha.tools" : "http://localhost:3000";
  const auth0Config = {
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: location + "/callback",
    responseType: "token id_token",
    scope: "email profile openid",
  };

  const { loginWithGoogle } = useAuth0(auth0Config);

  // Login with Google
  const handleGoogleLogin = () => {
    loginWithGoogle();
  };
  return (
    <div className="h-full login-container">
      <div className="flex min-h-full flex-col justify-center  sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            src="/assets/logo.png"
            className="mx-auto w-auto"
            style={{ height: "15vh" }}
            alt="logo"
          />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-stone-600">
            སྨོན་ལམ་རིག་ནུས།
          </h2>
          <div className="mx-auto  mt-2 text-center text-sm  leading-9 tracking-tight text-stone-900">
            Log in using Gmail
          </div>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[426px]">
          <div className="   sm:rounded-lg sm:px-12">
            <div>
              <div className="cursor-pointer mt-6 flex flex-col gap-3">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center gap-3 mr-2 mb-2"
                >
                  {/* <FcGoogle /> */}
                  <span className="text-lg font-semibold leading-6">
                    Google
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
