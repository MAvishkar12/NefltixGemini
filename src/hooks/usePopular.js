
import { useEffect } from "react";
import { Api_Options } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovie } from "../utils/movieSlice";
function usePopular() {
  const dispatch = useDispatch();
  const popular = useSelector((store) => store.movies.popular);
  useEffect(() => {
    !popular && getPopularMovie();
  }, []);

  const getPopularMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      Api_Options
    );
    const json = await data.json();

    dispatch(addPopularMovie(json.results));
  };
}

export default usePopular;
