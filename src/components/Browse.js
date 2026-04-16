import Header from "./Header";
import useNowPlayingMovie from "../hooks/useNowPlayingMovie";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRated from "../hooks/useTopRated";
import usePopular from "../hooks/usePopular";
import useUpcoming from "../hooks/useUpcoming";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
function Browse() {
  const gptShow = useSelector((store) => store.gpt.gptSearch);

  useNowPlayingMovie(); // calling custom hook in browse page
  useTopRated();
  usePopular();
  useUpcoming();

  return (
    <div>
      <Header></Header>
      {gptShow ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
}

export default Browse;
