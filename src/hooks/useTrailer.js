import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { Api_Options } from "../utils/constant";

function useTrailer(movieid) {
 
  
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo); // use memo
  const getMoviesTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
      movieid +
        "/videos?language=en-US",
      Api_Options
    );

  
    const jsondata = await data.json();

    const filterdata = jsondata.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterdata.length ? filterdata[0] : jsondata.results[0]; // if trailer is not present then tyser or another contain should be show   console.log(trailer);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    !trailerVideo && getMoviesTrailer();
  }, []);
}

export default useTrailer;
