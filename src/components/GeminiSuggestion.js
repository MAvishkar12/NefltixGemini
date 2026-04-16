import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

function GeminiSuggestion() {
  const movieNames = useSelector((store) => store.gemini.movieNames);
  const movieResults = useSelector((store) => store.gemini.movieResults);
  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-95 rounded-lg">
      <div className="space-y-6">
        {movieNames.map((movieName, index) => (
          <div key={movieName} className="animate-fade-in">
            <MovieList
              title={movieName}
              movies={movieResults[index]}
            />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default GeminiSuggestion;
