import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import { useState, useEffect } from "react";
import config from "../assets/config.json";

/**
 * The `PolicyGerman` component displays the privacy policy in German. It fetches content from a JSON file
 * (`/content/contact.json`) and renders the privacy policy sections, such as data controller, personal data
 * collection, cookies, embedded content, fonts, hosting provider, and user rights.
 *
 * It provides details like:
 * - The responsible data controller's contact information.
 * - Information on cookies, YouTube videos, and external resources.
 * - Hosting provider and their privacy policy.
 * - User rights under GDPR/DSGVO.
 * - Contact information for privacy-related queries.
 *
 * @component
 * @example
 * // Usage:
 * <PolicyGerman />
 *
 * @returns {JSX.Element} The rendered German privacy policy page or a loading message while content is being fetched.
 */
const PolicyGerman = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/content/contact.json")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setIsLoading(false);
      })
      .catch((exc) => {
        console.log(exc);
        setError("Failed to load content");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h3 style={{ paddingTop: "50%" }}>loading content...</h3>;
  }

  if (error) {
    return <h3 style={{ paddingTop: "50%" }}>{error}</h3>;
  }

  return (
    <div>
      <h1>Datenschutzerklärung</h1>
      <p>
        <strong>Letzte Aktualisierung:</strong> 25.09.2024
      </p>

      <h2>1. Verantwortlicher für die Datenverarbeitung</h2>
      <p>
        Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
        <br />
        <strong>{config.name}</strong>
        <br />
        {content.contact.map((item, idx) => (
          <span key={idx}>
            {item}
            <br />
          </span>
        ))}
      </p>

      <h2>2. Erhebung und Nutzung personenbezogener Daten</h2>
      <ul>
        <li>
          <strong>
            Keine automatisierte Erhebung personenbezogener Daten:
          </strong>{" "}
          Unsere Website erhebt keine personenbezogenen Daten wie IP-Adressen
          oder andere Tracking-Informationen automatisch. Wir verwenden keine
          Webanalysen, Tracking oder andere Drittanbieter-Marketing-Tools.
        </li>
        <li>
          <strong>Kontakt per E-Mail:</strong> Wenn Sie uns per E-Mail
          kontaktieren, werden Ihre personenbezogenen Daten (wie Ihr Name und
          Ihre E-Mail-Adresse) nur zur Beantwortung Ihrer Anfrage verwendet.
          Diese Informationen werden nicht an Dritte weitergegeben.
        </li>
      </ul>

      <h2>3. Cookies und eingebettete Inhalte</h2>
      <ul>
        <li>
          <strong>Cookies:</strong> Unsere Website verwendet nur notwendige
          Cookies im Zusammenhang mit der Wiedergabe von YouTube-Videos. Diese
          Cookies werden nur aktiviert, wenn Sie über unser Cookie-Banner Ihre
          Zustimmung geben.
        </li>
        <li>
          <strong>YouTube-Videos:</strong> Wir betten YouTube-Videos mithilfe
          von iFrames ein. Wenn Sie den Cookies zustimmen, kann YouTube Cookies
          setzen, um Ihre Wiedergabeaktivitäten zu verfolgen. Weitere
          Informationen finden Sie in der{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="links"
          >
            YouTube-Datenschutzerklärung
          </a>
          .
        </li>
      </ul>

      <h2>4. Schriftarten und externe Ressourcen</h2>
      <ul>
        <li>
          <strong>FontAwesome und Google Fonts:</strong> Unsere Website
          verwendet FontAwesome und Google Fonts, die beide lokal auf unserem
          Server gehostet werden. Es werden daher keine personenbezogenen Daten
          an externe Dienste für das Laden der Schriftarten weitergegeben.
        </li>
      </ul>

      <h2>5. Hosting-Anbieter</h2>
      <p>
        Unsere Website wird von {content.hosting.name} gehostet.{" "}
        {content.hosting.name} kann als Hosting-Anbieter Log-Dateien zu
        Sicherheits- und Wartungszwecken verarbeiten. Weitere Informationen zu
        den Datenschutzpraktiken finden Sie in der{" "}
        <a
          href={content.hosting.url}
          target="_blank"
          rel="noopener noreferrer"
          className="links"
        >
          Datenschutzerklärung von {content.hosting.name}
        </a>
        .
      </p>

      <h2>6. Ihre Rechte</h2>
      <p>
        Unter der DSGVO haben Sie die folgenden Rechte in Bezug auf Ihre
        personenbezogenen Daten:
      </p>
      <ul>
        <li>
          Das Recht auf Auskunft über Ihre gespeicherten personenbezogenen
          Daten.
        </li>
        <li>Das Recht auf Berichtigung unrichtiger Daten.</li>
        <li>Das Recht auf Löschung Ihrer Daten.</li>
        <li>
          Das Recht auf Einschränkung oder Widerspruch gegen die
          Datenverarbeitung.
        </li>
        <li>Das Recht auf Datenübertragbarkeit.</li>
      </ul>
      <p>
        Wenn Sie eines dieser Rechte ausüben möchten, kontaktieren Sie uns bitte
        unter der oben angegebenen E-Mail-Adresse.
      </p>

      <h2>7. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren.
        Bitte überprüfen Sie diese Seite regelmäßig auf Änderungen.
      </p>

      <h2>8. Kontakt</h2>
      <p>
        Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie
        uns bitte unter:
        <br />
        {content.contact.map((item, idx) => (
          <span key={idx}>
            {item}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
};

/**
 * The `PolicyEnglish` component displays the privacy policy in English. It fetches content from a JSON file
 * (`/content/contact.json`) and renders the privacy policy sections, such as data controller, personal data
 * collection, cookies, embedded content, fonts, hosting provider, and user rights.
 *
 * It provides details like:
 * - The responsible data controller's contact information.
 * - Information on cookies, YouTube videos, and external resources.
 * - Hosting provider and their privacy policy.
 * - User rights under GDPR/DSGVO.
 * - Contact information for privacy-related queries.
 *
 * @component
 * @example
 * // Usage:
 * <PolicyEnglish />
 *
 * @returns {JSX.Element} The rendered English privacy policy page or a loading message while content is being fetched.
 */
const PolicyEnglish = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/content/contact.json")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
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
    <div>
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last Updated:</strong> 25.09.2024
      </p>

      <h2>1. Data Controller</h2>
      <p>
        The data controller for this website is:
        <br />
        <strong>{config.name}</strong>
        <br />
        {content.contact.map((item, idx) => (
          <span key={idx}>
            {item}
            <br />
          </span>
        ))}
      </p>

      <h2>2. Personal Data Collection and Use</h2>
      <ul>
        <li>
          <strong>No Personal Data Automatically Collected:</strong> Our website
          does not automatically collect personal data about visitors, such as
          IP addresses or other tracking information. We do not use web
          analytics, tracking, or other third-party marketing tools.
        </li>
        <li>
          <strong>Contact via Email:</strong> If you contact us via email, your
          personal data (such as your name and email address) will only be used
          to respond to your inquiry. We do not share this information with any
          third parties.
        </li>
      </ul>

      <h2>3. Cookies and Embedded Content</h2>
      <ul>
        <li>
          <strong>Cookies:</strong> Our website only uses essential cookies
          related to YouTube video playback. These cookies are only activated if
          you give consent through our cookie consent banner.
        </li>
        <li>
          <strong>YouTube Videos:</strong> We embed YouTube videos using
          iFrames. When you consent to cookies, YouTube may set cookies to track
          your viewing activity. Please refer to{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="links"
          >
            YouTube&apos;s Privacy Policy
          </a>{" "}
          for more details.
        </li>
      </ul>

      <h2>4. Fonts and External Resources</h2>
      <ul>
        <li>
          <strong>FontAwesome and Google Fonts:</strong> Our website uses
          FontAwesome and Google Fonts, both of which are hosted locally on our
          server. Therefore, no personal data is shared with external services
          for font loading.
        </li>
      </ul>

      <h2>5. Hosting Provider</h2>
      <p>
        Our website is hosted by {content.hosting.name}. As the hosting
        provider, {content.hosting.name} may process log files for security and
        maintenance purposes. For more information on their privacy practices,
        please refer to{" "}
        <a
          href={content.hosting.url}
          target="_blank"
          rel="noopener noreferrer"
          className="links"
        >
          {content.hosting.name}&apos;s Privacy Policy
        </a>
        .
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Under GDPR/DSGVO, you have the following rights concerning your personal
        data:
      </p>
      <ul>
        <li>The right to access your personal data.</li>
        <li>The right to correct inaccurate data.</li>
        <li>The right to request the deletion of your data.</li>
        <li>The right to restrict or object to data processing.</li>
        <li>The right to data portability.</li>
      </ul>
      <p>
        If you would like to exercise any of these rights, please contact us at
        the email address provided above.
      </p>

      <h2>7. Changes to this Privacy Policy</h2>
      <p>
        We may update this privacy policy from time to time. Please review this
        page regularly for updates.
      </p>

      <h2>8. Contact</h2>
      <p>
        If you have any questions about this privacy policy, please contact us
        at:
        <br />
        {content.contact.map((item, idx) => (
          <span key={idx}>
            {item}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
};

/**
 * The `PrivacyPolicy` component determines the language and conditionally renders either the `PolicyGerman` or
 * `PolicyEnglish` component based on the current language in context.
 *
 * It uses the `LanguageContext` to check the user's language preference and dynamically displays the corresponding
 * version of the privacy policy.
 *
 * @component
 * @example
 * // Usage:
 * <PrivacyPolicy />
 *
 * @returns {JSX.Element} The rendered privacy policy in the appropriate language (German or English).
 */
const PrivacyPolicy = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="imprint_policy">
      {language === "de" ? <PolicyGerman /> : <PolicyEnglish />}
    </div>
  );
};

export default PrivacyPolicy;
