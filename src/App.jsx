
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
        <h1>Welcome to My React App</h1>
        <p>This is a p5.js sketch in the background!</p>
      </div>
      {/* <BackgroundWrapper canvas={flowField} /> */}
    </div>
    </>
  )
}

export default App


