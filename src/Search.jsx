/* eslint-disable react/prop-types */
export default function Search({ setQuery, query }) {
  return (
    <input
      type="text"
      value={query}
      placeholder="Search movies..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
