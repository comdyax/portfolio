import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { LanguageContext } from "../contexts/LanguageContextProvider";

/**
 * About component that displays content in english or german.
 * It fetches and displays content from 'about.json' file based on the selected language.
 *
 * @returns {JSX.Element} The About page component.
 */
const About = () => {
  const { language } = useContext(LanguageContext);
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches content from the "/content/about.json" file.
   * Updates state with the fetched content and handles errors.
   */
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

  // If the content is loading, display a loading message
  if (isLoading) {
    return (
      <div className="text-content">
        <h3>loading content...</h3>
      </div>
    );
  }

  // If there was an error loading the content, display an error message
  if (error) {
    return (
      <div className="text-content">
        <h3>{error}</h3>
      </div>
    );
  }

  /**
   * Returns the appropriate heading text based on the current language.
   *
   * @returns {string} "ÜBER" for German or "ABOUT" for English.
   */
  const heading = language === "de" ? "ÜBER" : "ABOUT";

  /**
   * Returns the appropriate text array based on the current language.
   *
   * @returns {Array<string>} Array of content text in the selected language.
   */
  const text = language === "de" ? content.text_german : content.text_english;

  /**
   * Returns the appropriate instrument text for a given team member based on the current language.
   *
   * @param {Object} member - A member object containing instrument information.
   * @returns {string} The instrument name in the selected language.
   */
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
