import Movies from "./Movies";

/* eslint-disable react/prop-types */
export default function MovieList({ movie, onSelect }) {
  return (
    <ul className="list list-movie">
      {movie?.map((movie) => (
        <Movies movie={movie} key={movie.imdbId} onSelect={onSelect} />
      ))}
    </ul>
  );
}
