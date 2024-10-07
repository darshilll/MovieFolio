import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopularMovie = () => {
  const [pmovies, setPmovies] = useState([]);

  useEffect(() => {
    const fetchPopMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data = await response.json();
        setPmovies(data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchPopMovies();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2
        className="text-white font-bold
      text-lg md:text-xl lg:text-2xl py-2"
      >
        Popular Movies
      </h2>
      <ul className="grid grid-cols-1 px-6 gap-4 lg:ml-0 w-full sm:grid-cols-2 md:grid-cols-3 md:ml-4 lg:grid-cols-4 lg:gap-16 lg:px-32">
        {pmovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-auto h-auto rounded-lg"
              />
              <span className="text-center text-white text-lg font-semibold">
                <p>{movie.title}</p>
                <p>Rating: {movie.vote_average}</p>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularMovie;
