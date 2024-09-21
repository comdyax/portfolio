import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import BackgroundWrapper from "./BackgroundWrapper";
import { gridParticles } from "../p5_drawings/gridParticles";
import { flowField } from "../p5_drawings/flowField";

const Band = ({ lan }) => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    fetch("/content/band.json")
      .then((res) => res.json())
      .then((text) => setContent(text))
      .catch((exc) => console.log(exc));
  }, [lan]);
  return (
    <div className="app-container">
      <BackgroundWrapper canvas={flowField} />
      <div id="band" className="band">
        {content ? (
          <>
            <h1>{content.title}</h1>
            <br />
            {lan == "de"
              ? content.text_german.map((con, idx) => <p key={idx}>{con}</p>)
              : content.text_english.map((con, idx) => <p key={idx}>{con}</p>)}
          </>
        ) : (
          <h3>loading content...</h3>
        )}
        <p>
          Stephan Deller | Kontrabass
          <br />
          <a
            href="https://www.christopherkunz.net"
            target="_blank"
            className="links"
          >
            Christopher Kunz &ensp;
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
          &ensp; | Tenorsaxophon
          <br />
          Max Hirth | Tenorsaxophon
          <br />
          <a
            href="https://www.tom-friedrich.com"
            target="_blank"
            className="links"
          >
            Tom Friedrich&ensp;
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
          &ensp; | Schlagzeug
        </p>
      </div>
    </div>
  );
};

export default Band;
