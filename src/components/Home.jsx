import { audioVisualizer } from "../p5_drawings/audioVisualizer";
import BackgroundWrapper from "./BackgroundWrapper";

const Home = () => {
  return <BackgroundWrapper canvas={audioVisualizer} />
};

export default Home;
