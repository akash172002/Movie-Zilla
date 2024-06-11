/* eslint-disable react/prop-types */
export default function NumReasult({ movie }) {
  return <p>Found {movie?.length > 0 ? movie?.length : "0"} results</p>;
}
