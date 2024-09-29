import BackgroundWrapper from "./BackgroundWrapper";
import { gridParticles } from "../p5_drawings/gridParticles";
import ParticleSystem from "./ParticleSystem";

const Home = () => {
  return (
    <>
      {/* <BackgroundWrapper canvas={gridParticles} /> */}
      <div style={{ height: "100vh", width: "100vw", background: "#000" }}>
        <ParticleSystem />
      </div>
    </>
  );
};

export default Home;
