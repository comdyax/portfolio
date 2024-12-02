import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";

/**
 * Formats a given date string into a localized German date format (DD.MM.YYYY).
 *
 * This function takes a date string, converts it to a JavaScript `Date` object, and formats it using the
 * `Intl.DateTimeFormat` API to output the date in the German format: day (2-digit), month (2-digit), and year (numeric).
 *
 * @param {string} dateString - A date string that can be parsed into a valid JavaScript `Date` object.
 * @returns {string} The formatted date string in the "DD.MM.YYYY" format, localized to German (de-DE).
 *
 * @example
 * // Example usage
 * const formattedDate = formatDate("2024-12-02");
 * console.log(formattedDate); // Output: "02.12.2024"
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const conf = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("de-DE", conf).format(date);
};

/**
 * The `Tour` component displays a list of concert dates and locations.
 * It fetches tour data from a JSON file and renders a table of concert dates
 * with optional links to external sites for each concert. The component supports
 * dynamic language switching between German and English.
 *
 * The component fetches tour information from a local JSON file (`/content/tour.json`),
 * formats the concert dates, and displays them in a table. Each entry shows the date
 * and location of the concert, with a link if provided.
 *
 * @component
 * @example
 * // Usage:
 * <Tour />
 *
 * @returns {JSX.Element} The JSX for rendering the concert dates and locations.
 */
const Tour = () => {
  const { language } = useContext(LanguageContext);
  const [dates, setDates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/content/tour.json")
      .then((res) => res.json())
      .then((text) => {
        setDates(text);
        setIsLoading(false);
      })
      .catch((exc) => {
        console.log(exc);
        setError("Failed to load content");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="text-content">
        <h3>loading content...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-content">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div className="text-content">
      <h1>{language === "de" ? "KONZERTE" : "TOUR"}</h1>
      <br />
      <Table
        borderless
        hover
        variant="dark"
        className="tour_table rounded-3 overflow-hidden"
      >
        <thead>
          <tr>
            <th>{language === "de" ? "Datum" : "Date"}</th>
            <th>{language === "de" ? "Ort" : "Location"}</th>
          </tr>
        </thead>
        <tbody>
          {dates.dates
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((date, idx) => (
              <tr key={idx}>
                {date.url != null ? (
                  <>
                    <td>{formatDate(date.date)}</td>
                    <td>
                      <a href={date.url} target="_blank" className="links">
                        {" "}
                        @ {date.text}{" "}
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </a>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{formatDate(date.date)}</td>
                    <td> @ {date.text}</td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tour;
