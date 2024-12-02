import { Link } from "react-router-dom";

/**
 * NotFound is a React component that displays a 404 error message when a page is not found.
 * It provides a link to navigate back to the homepage.
 *
 * The component renders a "404 - Page Not Found" heading, a secondary message,
 * and a link that redirects the user to the homepage (`/`).
 *
 * @component
 *
 * @example
 * // Usage:
 * <NotFound />
 *
 * @returns {JSX.Element} The JSX for the "404 - Page Not Found" message and a link to the homepage.
 */
const NotFound = () => (
  <div className="text-content">
    <h1>404 - Page Not Found</h1>
    <h2>These aren&apos;t the pages you are looking for</h2>
    <Link to="/" className="links">
      <h3>move along home</h3>
    </Link>
  </div>
);

export default NotFound;
