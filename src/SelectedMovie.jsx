import { useEffect, useState } from "react";
import { KEY } from "./App";
import StarComponent from "./StarComponent";
import Loader from "./Loader";

/* eslint-disable react/prop-types */
export default function SelectedMovie({ selectedId, onAdd, onClose, watched }) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const userRated = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    director: director,
    Genre: genre,
  } = movie;

  function handleAddWatched() {
    const newWatchedMove = {
      year,
      title,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
      imdbID: selectedId,
      poster,
    };

    onAdd(newWatchedMove);
    onClose();
  }

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );

      const data = await res.json();

      setMovie(data);
      setLoading(false);
    }

    fetchMovie();
  }, [selectedId]);

  function handleAddRating(rating) {
    setUserRating(rating);
  }

  return (
    <div className="detail">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`${poster} Poster`} />
            <div className="movie-detail">
              <h2>{title}</h2>
              <p>{released}</p>
              <p>{genre}</p>
              <p>⭐ {imdbRating}</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                `You already RATED this movie ${userRated}`
              ) : (
                <>
                  <StarComponent
                    maxRating={10}
                    size={24}
                    onSetRating={handleAddRating}
                  />
                  {userRating > 0 && (
                    <p className="btn-watchlist" onClick={handleAddWatched}>
                      + Add TO WATCHLIST
                    </p>
                  )}
                </>
              )}
            </div>
            <p>{plot}</p>
            <p>{actors}</p>
            <p>{director}</p>
          </section>
        </>
      )}
    </div>
  );
}
