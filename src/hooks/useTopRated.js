
import { useEffect } from "react";
import { Api_Options } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovie } from "../utils/movieSlice";
function useTopRated() {
  const dispatch = useDispatch();
  const toprated = useSelector((store) => store.movies.topRated);
  useEffect(() => {
    !toprated && getTopRatedMovie();
  }, [toprated]);

  const getTopRatedMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      Api_Options
    );
    
    const json = await data.json();
 
    dispatch(addTopRatedMovie(json.results));
  };
}

export default useTopRated;
