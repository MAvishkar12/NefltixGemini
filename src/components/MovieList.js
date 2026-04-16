import React from "react";
import MovieCard from "./MovieCard";
import ShimmerUi from "./ShimmerUi";

function MovieList({ title, movies }) {
  console.log("movie title and movies list",title,movies)
  return (
    <div className="px-6">
      <h1 className="text-2xl md:text-4xl font-bold py-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-yellow-400 hover:via-yellow-500 hover:to-red-500 px-4 rounded-lg cursor-pointer transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-gray-800/50 hover:via-gray-700/50 hover:to-gray-800/50 hover:shadow-lg hover:shadow-red-600/50 transform hover:scale-105">
        {title}
      </h1>
      {!movies ? (
        <ShimmerUi />
      ) : (
        <div className="flex overflow-x-scroll overflow-x:hidden">
          <div className="flex">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} posterpath={movie.poster_path} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieList;
