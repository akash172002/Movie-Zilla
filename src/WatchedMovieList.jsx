import Watched from "./Watched";

/* eslint-disable react/prop-types */
export default function WatchedMovieList({ watched, onRemove }) {
  return (
    <ul className="list">
      {watched.map((watched) => (
        <Watched watched={watched} key={watched.imdbID} onRemove={onRemove} />
      ))}
    </ul>
  );
}
