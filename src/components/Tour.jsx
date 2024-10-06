import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";

const Tour = () => {
  const { language } = useContext(LanguageContext);
  const [dates, setDates] = useState(null);
  useEffect(() => {
    fetch("/content/tour.json")
      .then((res) => res.json())
      .then((text) => setDates(text))
      .catch((exc) => console.log(exc));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const conf = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("de-DE", conf).format(date);
  };

  return (
    <div className="text-content">
      {dates ? (
        <>
          <h1>{dates.title}</h1>
          <br />
          <Table borderless hover variant="dark" className="tour_table rounded-3 overflow-hidden">
            <thead>
              <tr >
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
                      <><td>
                        {formatDate(date.date)}</td>
                        <td> @ {date.text}</td>
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h3>loading content...</h3>
      )}
    </div>
  );
};

export default Tour;
