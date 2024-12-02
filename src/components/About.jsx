import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { LanguageContext } from "../contexts/LanguageContextProvider";

/**
 * The `About` component fetches and displays information about the site or band, including its text content and member details.
 * It supports language switching between German and English and handles loading and error states.
 *
 * This component will display:
 * - A heading with the title ("ABOUT" or "ÜBER")
 * - The main content text, based on the current language
 * - A list of members, each with their instrument and optional URL links to external pages
 *
 * @component
 * @example
 * // Usage:
 * <About />
 *
 * @returns {JSX.Element} The JSX for rendering the about page, including content and team member details.
 */
const About = () => {
  const { language } = useContext(LanguageContext);
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/content/about.json")
      .then((res) => res.json())
      .then((text) => {
        setContent(text);
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

  const heading = language === "de" ? "ÜBER" : "ABOUT";

  const text = language === "de" ? content.text_german : content.text_english;

  const getMemberInstrument = (member) =>
    language === "de" ? member.instrument_german : member.instrument_english;

  return (
    <div className="text-content">
      <h1>{heading}</h1>
      <br />
      {text.map((con, idx) => (
        <p key={idx}>{con}</p>
      ))}
      <br />
      <div>
        {content.members.map((member, idx) => (
          <div key={idx}>
            {member.url ? (
              <a
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                {member.name} &ensp;
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  aria-label="Open link in new tab"
                />
                &ensp;
              </a>
            ) : (
              <span>{member.name} &ensp; | &ensp;</span>
            )}
            {getMemberInstrument(member)}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
