/* eslint-disable react/prop-types */
export default function Watched({ watched, onRemove }) {
  return (
    <li>
      <img src={watched.poster} alt={`${watched.title} Poster`} />
      <h3>{watched.title}</h3>
      <div className="watched-div">
        <p>
          <span>⭐</span>
          <span>{watched.imdbRating}</span>
        </p>
        <p>
          <span>✨</span>
          <span>{watched.userRating}</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{watched.runtime}</span>
        </p>

        <button className="btn-remove" onClick={() => onRemove(watched.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}
