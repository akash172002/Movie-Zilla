/* eslint-disable react/prop-types */
export default function WatchedSummary({ watched }) {
  const average = (arr) =>
    arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

  const averageImdbRating = average(
    watched?.map((watched) => watched.imdbRating)
  );
  const averageUserRating = average(
    watched?.map((watched) => watched.userRating)
  );
  const averageRuntime = average(watched?.map((watched) => watched.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐</span>
          <span>{averageImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>✨</span>
          <span>{averageUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{averageRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
