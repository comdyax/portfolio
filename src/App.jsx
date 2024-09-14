
import BackgroundWrapper from './components/BackgroundWrapper';
import { gridParticles } from './p5_drawings/gridParticles';
import { flowField } from './p5_drawings/flowField';
import './App.css'

function App() {

  return (
    <>
    <div className="app-container">
      <BackgroundWrapper canvas={gridParticles} />
      <div className="content">
        <h1>Perplexities on Mars</h1>
      </div>
      {/* <BackgroundWrapper canvas={flowField} /> */}
    </div>
    </>
  )
}

export default App


