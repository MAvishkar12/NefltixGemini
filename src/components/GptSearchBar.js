import React, { useRef, useState } from "react";
import { Form } from "react-router-dom";
import lang from "../utils/languageConstant";
import { useSelector, useDispatch } from "react-redux";
import { Api_Options } from "../utils/constant";
import { addMovieName, addMovieResults } from "../utils/geminislice";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
const apikey = process.env.REACT_APP_GEMINI_KEY;

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  safetySettings,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// -------------------------------------------------------

function GptSearchBar() {
  const langkey = useSelector((store) => store.config.lang);
  const SearchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    console.log("tmdb single movie", movie);
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      Api_Options
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = async () => {
    if (!SearchText.current.value.trim()) {
      setError("Please try after some Time ");
      setTimeout(() => setError(null), 3000);
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const userQuery = SearchText.current.value.trim();
      
      // Enhanced query: Get the specific movie first, then similar movies
      const query =
        `You are a movie expert. The user is searching for: "${userQuery}". 
        Please do the following:
        1. First, identify and return the exact movie name the user is searching for
        2. Then, suggest 4-5 movies that are similar in genre, theme, or style to that movie
        
        Return ONLY movie names, comma separated, starting with the searched movie first.
        Format: MovieName,RelatedMovie1,RelatedMovie2,RelatedMovie3,RelatedMovie4,RelatedMovie5
        Example: The Shawshank Redemption,Forrest Gump,Pulp Fiction,The Dark Knight,Inception,Fight Club
        Remove any \\n from result and only return plain comma-separated movie names.`;

      const chatSession = model.startChat({ generationConfig, history: [] });
      const result = await chatSession.sendMessage(query);
      console.log("result of text", result);
      const gptMovies = result.response.text().replace(/\n/g, "").split(",").filter(movie => movie.trim());
      
      if (gptMovies.length === 0) {
        setError("Please try after some Time ");
        setTimeout(() => setError(null), 3000);
        setIsLoading(false);
        return;
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));
      const tmdbResults = await Promise.all(promiseArray);
      
      // Filter out empty results
      const hasResults = tmdbResults.some(result => result && result.length > 0);
      if (!hasResults) {
        setError("Please try after some Time ");
        setTimeout(() => setError(null), 3000);
        setIsLoading(false);
        return;
      }

      console.log("movie result", tmdbResults);
      console.log("get movies list", gptMovies);
      dispatch(addMovieName(gptMovies));
      dispatch(addMovieResults(tmdbResults));
    } catch (error) {
      console.error("GPT Search failed:", error);
      setError("Please try after some Time ");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGptSearch();
    }
  };

  return (
    <>
      {/* Error Popup */}
      {error && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
          <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 font-medium">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-white text-lg font-semibold">Searching movies...</p>
          </div>
        </div>
      )}

      <div className={`pt-[36%] md:pt-[10%] flex justify-center transition-all ${isLoading ? "blur-sm" : ""}`}>
        <Form
          className="w-full md:w-1/2 flex gap-3 px-4 md:px-0"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full border-2 border-gray-700 focus:border-red-500 focus:outline-none transition-all duration-300 placeholder-gray-400 font-semibold hover:border-gray-600 focus:shadow-lg focus:shadow-red-600/50 hover:shadow-md hover:shadow-gray-700/50"
            ref={SearchText}
            placeholder={lang[langkey].gptSearchText}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:from-red-900 disabled:to-red-950 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:shadow-red-600/50 flex items-center gap-2 whitespace-nowrap"
            onClick={handleGptSearch}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            {lang[langkey].search}
          </button>
        </Form>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default GptSearchBar;
