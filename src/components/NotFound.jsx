import { Link } from "react-router-dom";

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
