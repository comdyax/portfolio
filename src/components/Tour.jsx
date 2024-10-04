import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Tour = () => {
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
          {dates.dates
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((date, idx) => (
              <p key={idx}>
                {date.url != null ? (
                  <>
                    {formatDate(date.date)}
                    <a href={date.url} target="_blank" className="links">
                      {" "}
                      @ {date.text}{" "}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  </>
                ) : (
                  <>
                    {formatDate(date.date)} @ {date.text}
                  </>
                )}
              </p>
            ))}
        </>
      ) : (
        <h3>loading content...</h3>
      )}
    </div>
  );
};

export default Tour;
