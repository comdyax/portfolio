import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import BackgroundWrapper from "./BackgroundWrapper";
import { gridParticles } from "../p5_drawings/gridParticles";

const Band = () => {
  return (
    <div className="app-container">
      <BackgroundWrapper canvas={gridParticles} />
      <div id="band" className="band">
        <h1>BAND</h1>
        <br />
        <p>
          Wer sagt, dass Beobachtungen unseres Sonnensystems nur Astronauten und
          maschinellen Flugkörpern vergönnt sind?
        </p>
        <p>
          Die vier von Perplexities on Mars zeichnen ihre Beobachtungen für
          Tagträumer und aufmerksame Zuhörer tonmalerisch in jedermanns
          Phantasie. Sie widmen sich unteranderem dem hellsten Stern an unserem
          Himmel - der Sonne - und erzählen die Geschichte eines Ringplaneten.
          Aber auch andere universale Erlebnisse werden in den Musikstücken der
          Band geschildert. Dass es dabei nun ausgerechnet auf dem roten
          Planeten zu Ratlosigkeit (Perplexity) kommt, kann sich wahrscheinlich
          selbst der Namensgeber und Kriegsgott Mars nicht erklären….
        </p>
        <p>
          Mit dieser speziellen Besetzung, ohne Harmonieinstrument, erzeugt die
          Gruppe - durch hochenergetische und melodische Eigenkompositionen -
          eine stilistisch tief in der Jazztradition verankerte, aber zugleich
          moderne und neue Musik, die durch die verschiedenen sich ergänzenden
          Improvisationen einzigartig wird.
        </p>
        <p>
          „[…] das Quartett &apos;Perplexities on Mars&apos; […] in dem sich
          zwei Tenorsaxophonisten (Christopher Kunz und Max Hirth)
          energiegeladene Battles lieferten, also kreative Jazz-Wettkämpfe, die
          hohe Tradition haben - hier aber so modern und berstend intensiv
          klangen wie nur selten sonst.“ - Roland Spiegel; BR-Klassik
        </p>
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
