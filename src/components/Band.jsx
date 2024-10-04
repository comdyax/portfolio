import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";

const Band = () => {
  const { language } = useContext(LanguageContext);
  const [content, setContent] = useState(null);
  useEffect(() => {
    fetch("/content/band.json")
      .then((res) => res.json())
      .then((text) => setContent(text))
      .catch((exc) => console.log(exc));
  }, []);
  return (
    <div className="text-content">
      {content ? (
        <>
          <h1>{content.header}</h1>
          <br />
          {language == "de"
            ? content.text_german.map((con, idx) => <p key={idx}>{con}</p>)
            : content.text_english.map((con, idx) => <p key={idx}>{con}</p>)}
          <br />
          <div>
            {content.members.map((member, idx) =>
              member.url ? (
                <div key={idx}>
                  <a href={member.url} target="_blank" className="links">
                    {member.name} &ensp;
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    &ensp;
                  </a>
                  | &ensp;
                  {language === "de"
                    ? member.instrument_german
                    : member.instrument_english}
                  <br />
                </div>
              ) : (
                <div key={idx}>
                  {member.name} &ensp; | &ensp;
                  {language === "de"
                    ? member.instrument_german
                    : member.instrument_english}
                  <br />
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <h3>loading content...</h3>
      )}
    </div>
  );
};

export default Band;
