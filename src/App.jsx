import { useEffect, useState } from "react";
import Box from "./Box";
import Nav from "./Nav";
import NumReasult from "./NumReasult";
import Search from "./Search";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMovieList from "./WatchedMovieList";
import Loader from "./Loader";
import Error from "./Error";
import SelectedMovie from "./SelectedMovie";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
export const KEY = "6c19f6dd";

function App() {
  const [movie, setMovie] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSelectedId(id) {
    setSelectedId((cur) => (cur === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((prev) => [...prev, movie]);
  }

  function handleClose() {
    setSelectedId(null);
  }

  function handleRemove(id) {
    setWatched((watched) =>
      watched.filter((watchedId) => watchedId.imdbID !== id)
    );
  }

  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      if (e.code === "Escape") {
        setSelectedId(null);
      }
    });
  }, []);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          ` http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        setMovie(data.Search);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchMovie();
  }, [query]);

  return (
    <>
      <Nav>
        <Search setQuery={setQuery} query={query} />
        <NumReasult movie={movie} />
      </Nav>

      <main className="main">
        <Box>
          {loading && <Loader />}

          {!loading && !error && (
            <MovieList movie={movie} onSelect={handleSelectedId} />
          )}
          {error && <Error message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onClose={handleClose}
              onAdd={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} onRemove={handleRemove} />
            </>
          )}
        </Box>
      </main>
    </>
  );
}

export default App;
