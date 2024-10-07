import { useState } from "react";
import { Route, Routes } from "react-router";
// import HomePage from "./components/HomePage";
import PopularMovie from "./components/PopularMovie";
import TopRatedMovie from "./components/TopRatedMovie";
import UpcomingMovie from "./components/UpcomingMovie";
import Navbar from "./components/Navbar"; 
import MovieDetail from "./components/MovieDetail";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <main>
      <Navbar setSearchResults={setSearchResults} />

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 gap-16 px-32">
          {searchResults.map((movie) => (
            <div key={movie.id} className="text-white text-center">
              <div
                onClick={() => (window.location.href = `/movie/${movie.id}`)}
                className="cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-96 rounded"
                />
                <h3 className="text-lg font-semibold mt-2 ">{movie.title}</h3>
                <p>Rating: {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // When no search results, show the main routes
        <Routes>
          
          <Route path="/" element={<PopularMovie />} />
          <Route path="/top-rated" element={<TopRatedMovie />} />
          <Route path="/upcoming" element={<UpcomingMovie />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      )}
    </main>
  );
};

export default App;
