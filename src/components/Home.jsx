import BackgroundWrapper from "./BackgroundWrapper";
import { gridParticles } from "../p5_drawings/gridParticles";

const Home = () => {
  return (
    <>
      <div className="app-container">
        <BackgroundWrapper canvas={gridParticles} />
        {/* <BackgroundWrapper canvas={flowField} /> */}
        <div className="content">
          <h1>Perplexities on Mars</h1>
        </div>
       
      </div>
    </>
  );
};

export default Home;
