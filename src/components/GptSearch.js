import { Netflix_bg } from "../utils/constant";
import React from "react";
import GptSearchBar from "./GptSearchBar";
import GeminiSuggestion from "./GeminiSuggestion";

function GptSearch() {
  return (
    <>
      <div className="fixed -z-10 w-full h-full">
        <img
          className="w-full h-full object-cover"
          src={Netflix_bg}
          alt="netflix-bg"
        />
      </div>
      <div className="relative pt-20 min-h-screen">
        <GptSearchBar />
        <GeminiSuggestion />
      </div>
    </>
  );
}

export default GptSearch;
