/* eslint-disable react/prop-types */
export default function Movies({ movie, onSelect }) {
  return (
    <li onClick={() => onSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p className="movie-list-p">
          <span>📅</span> <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
