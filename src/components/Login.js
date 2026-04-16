import React, { useRef, useState } from "react";
import Header from "./Header";
import { Netflix_bg } from "../utils/constant";
import { checkValidteData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [isSignform, setSignform] = useState(true);
  const [errorMassage, seterrMassage] = useState(null);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmitBtn = () => {
    const message = checkValidteData(
      email.current.value,
      password.current.value
    );
    seterrMassage(message);
    if (message) return;

    if (isSignform) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => console.log(user))
            .catch((error) => seterrMassage(error.message));
        })
        .catch((error) => {
          seterrMassage(error.code + " " + error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {})
        .catch((error) => {
          seterrMassage(error.code + " - " + error.message);
        });
    }
  };

  const handleGuestSignIn = () => {
    setIsGuestLoading(true);
    seterrMassage(null);
    signInAnonymously(auth)
      .then(() => console.log("Signed in as guest"))
      .catch((error) => seterrMassage(error.code + " - " + error.message))
      .finally(() => setIsGuestLoading(false));
  };

  return (
    // ✅ Outermost div: full viewport height, background applied here
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Netflix_bg})` }}
    >
      {/* ✅ Dark overlay so form is always readable */}
      <div className="min-h-screen bg-black/50">
        <Header />

        {/* ✅ Flex centering instead of absolute positioning — no cut-off */}
        <div className="flex justify-center items-start py-16 px-4">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-md p-10 bg-black/80 text-white rounded-lg"
          >
            <h1 className="font-bold text-3xl py-4">
              {isSignform ? "Sign Up" : "Sign In"}
            </h1>

            {isSignform && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="p-4 my-4 w-full bg-slate-700 rounded-lg border border-white/30 focus:outline-none focus:border-white"
              />
            )}

            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="p-4 my-4 w-full bg-slate-700 rounded-lg border border-white/30 focus:outline-none focus:border-white"
            />

            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-4 my-4 w-full bg-slate-700 rounded-lg border border-white/30 focus:outline-none focus:border-white"
            />

            {errorMassage && (
              <p className="px-2 text-red-500 font-bold text-sm">
                {errorMassage}
              </p>
            )}

            <button
              className="p-4 my-6 bg-red-600 hover:bg-red-700 w-full rounded-lg font-semibold transition-colors duration-200"
              onClick={handleSubmitBtn}
            >
              {isSignform ? "Sign Up" : "Sign In"}
            </button>

            <div className="flex items-center my-2">
              <hr className="flex-grow border-gray-500" />
              <span className="mx-3 text-gray-400 text-sm">OR</span>
              <hr className="flex-grow border-gray-500" />
            </div>

            <button
              className="p-4 my-4 bg-gray-600 hover:bg-gray-500 w-full rounded-lg text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGuestSignIn}
              disabled={isGuestLoading}
            >
              {isGuestLoading ? "Signing in..." : "Continue as Guest"}
            </button>

            <p
              className="py-4 cursor-pointer text-gray-300 hover:text-white transition-colors text-sm"
              onClick={() => setSignform(!isSignform)}
            >
              {isSignform
                ? "Already registered? Sign In Now"
                : "New to Netflix? Sign Up Now"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;