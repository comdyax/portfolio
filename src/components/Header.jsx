import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";

const Header = () => {
  const { language, handleSetLanguage } = useContext(LanguageContext);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Perplexities on Mars</Link>
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
              value={language}
              onChange={(event) => handleSetLanguage(event.target.value)}
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
