import React, { useState } from "react";
import { Poster_url } from "../utils/constant";

function MovieCard({ posterpath, title = "Movie Title", overview = "No description available" }) {
  const [showModal, setShowModal] = useState(false);

  if (!posterpath) return null;

  return (
    <>
      {/* Movie Card */}
      <div
        className="w-36 md:w-44 pr-4 cursor-pointer group transition-all duration-300 ease-out hover:scale-110 hover:z-20"
        onClick={() => setShowModal(true)}
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
          <img
            src={Poster_url + posterpath}
            alt="Poster"
            className="w-full h-auto group-hover:brightness-75 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <span className="text-white text-sm font-semibold">Click to View</span>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors duration-200 z-10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row gap-6 p-6">
              {/* Poster Image */}
              <div className="flex-shrink-0">
                <img
                  src={Poster_url + posterpath}
                  alt={title}
                  className="w-48 h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Movie Details */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
                
                <div className="mb-6">
                  <h3 className="text-red-600 font-semibold mb-2">Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {overview || "No description available"}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-semibold">Rating:</span>
                    <span className="text-yellow-500 text-lg">★★★★☆</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-semibold">Genre:</span>
                    <span className="text-gray-300">Action, Drama</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    ▶ Watch Now
                  </button>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    + Add to List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scale-up {
          animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}

export default MovieCard;
