/* eslint-disable react/prop-types */
// import { useState } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // To programmatically navigate

  const handleSearch = async (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_API_KEY;

    if (query.trim()) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
        );
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleNavigation = (path) => {
    setSearchResults([]); // Clear search results before navigating
    navigate(path); // Navigate to the route
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 p-3 sticky top-0 w-full h-full overflow-hidden">
      <Link to="/" className="text-white font-bold text-xl hidden md:block">
        MovieFolio
      </Link>

      <div className="flex items-center gap-16 text-gray-300 font-semibold text-xs md:text-md lg:text-lg">
       
        <button
          className="text-gray-300"
          onClick={() => handleNavigation("/")}
        >
          Popular Movies
        </button>
        <button
          className="text-gray-300"
          onClick={() => handleNavigation("/top-rated")}
        >
          Top Rated
        </button>
        <button
          className="text-gray-300"
          onClick={() => handleNavigation("/upcoming")}
        >
          Upcoming
        </button>
        <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="outline-none rounded-md px-3 py-1 text-black"
        />
        <button
          type="submit"
          className="ml-2 bg-gray-700 px-4 py-1
           text-white rounded-md"
        >
          Search
        </button>
      </form>
      </div>

     
      
    </nav>
  );
};

export default Navbar;
