import { Outlet, Link } from "react-router-dom";

const Header = ({ lan, handleLanChange }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Perplexities on Mars </Link>
          </li>
          <li>
            <Link to="/releases">Releases</Link>
          </li>
          <li>
            <Link to="/video">Video</Link>
          </li>
          <li>
            <Link to="/tour">Tour</Link>
          </li>
          <li>
            <Link to="/band">Band</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <select
              className="form-select w-auto"
              value={lan}
              onChange={(event) => handleLanChange(event.target.value)}
            >
              <option value="en">english</option>
              <option value="de">german</option>
            </select>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
