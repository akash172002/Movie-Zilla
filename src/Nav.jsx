/* eslint-disable react/prop-types */
import Logo from "./Logo";

export default function Nav({ children }) {
  return (
    <nav className="nav">
      <Logo />
      {children}
    </nav>
  );
}
