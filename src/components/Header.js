import React from "react";
import { Netflix_logo } from "../utils/constant";
import { UserImg } from "../utils/constant";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeuser } from "../utils/userSlice";
import { addtooggle } from "../utils/gptSlice";
import { Supported_language } from "../utils/constant";
import { ChangeLanguage } from "../utils/confligSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGpt = useSelector((store) => store.gpt.gptSearch);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handlelanguageChange = (e) => {
    dispatch(ChangeLanguage(e.target.value));
  };

  const handleGpt = () => {
    dispatch(addtooggle());
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse"); // user sign in
      } else {
        dispatch(removeuser()); // if user signout remove user
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-gradient-to-b from-black via-black to-transparent shadow-lg"
            : "bg-gradient-to-b from-black via-black/80 to-transparent"
        }`}
      >
        <div className="px-6 md:px-12 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 hover:scale-110 transition-transform duration-300">
            <img src={Netflix_logo} className="w-32 md:w-40" alt="Netflix logo" />
          </div>

          {/* Right Section */}
          {user && (
            <div className="flex items-center gap-3 md:gap-6 animate-slide-in">
              {/* Language Selector */}
              <div className="relative group">
                <select
                  className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm md:text-base appearance-none cursor-pointer border border-gray-700 hover:border-red-600 pr-10 group-hover:shadow-lg group-hover:shadow-red-600/30"
                  onChange={handlelanguageChange}
                >
                  {Supported_language.map((lan) => (
                    <option value={lan.identifier} key={lan.identifier} className="bg-gray-900 text-white">
                      {lan.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 transition-transform duration-300 group-hover:text-red-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Gemini Search Button */}
              <button
                className={`px-4 md:px-6 py-2 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  showGpt
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-lg hover:shadow-blue-500/50"
                    : "bg-gradient-to-r from-purple-600 to-purple-800 hover:shadow-lg hover:shadow-purple-500/50"
                }`}
                onClick={handleGpt}
              >
                {showGpt ? (
                  <span className="flex items-center gap-2">
                    <span>🏠</span> Home
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>✨</span> Gemini
                  </span>
                )}
              </button>

              {/* User Avatar */}
              <div className="hidden md:block">
                <img
                  className="w-10 h-10 rounded-full border-2 border-red-600 hover:border-red-500 hover:scale-110 transition-all duration-300 cursor-pointer object-cover"
                  src={UserImg}
                  alt="user avatar"
                />
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg hover:shadow-red-500/50 text-sm md:text-base"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>
    </>
  );
}

export default Header;
