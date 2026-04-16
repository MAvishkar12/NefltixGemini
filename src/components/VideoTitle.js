import React from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function VideoTitle({ title, overview }) {
  const langkey = useSelector((store) => store.config.lang);
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-gray-black">
      <h1 className=" text-2xl md:text-6xl font-bold ">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:my-0">
        <button className="bg-white text-black py-1 md:py-4 px-2 md:px-12 text-lg  rounded-lg  hover:bg-opacity-80">
          <PlayArrowIcon /> {lang[langkey].playbtn}
        </button>
        <button className="hidden md:inline-block  bg-gray-500 text-white p-4 px-12 text-lg bg-opacity-50 rounded-lg mx-2  ">
          {lang[langkey].moreBtn}
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;
