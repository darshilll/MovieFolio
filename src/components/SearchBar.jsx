/* eslint-disable react/prop-types */
import { useState } from "react";

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");

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

  return (
    <form onSubmit={handleSearch} className="flex items-center mt-5">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="outline-none rounded-md px-3 py-1.5 text-black"
      />
      <button
        type="submit"
        className="ml-2 bg-gray-700 px-4 py-1.5 text-white rounded-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
