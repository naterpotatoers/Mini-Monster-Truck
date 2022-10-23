import { useState, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import DataTable from './components/DataTable';
// import MapContainer from './components/MapContainer';


function App() {
  const [isMapView, setIsMapView] = useState(false)
  const [commands, setCommands] = useState({ speed: "0", angle: "0", direction: "0" });

  function handleSubmit(event) {
    event.preventDefault();

    const speed = Number(commands.speed);
    const angle = Number(commands.angle);
    const direction = Number(commands.direction);

    fetch('http://localhost:5000/commands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ speed, angle, direction })
    });
    console.log({ speed, angle, direction });
  }
  return (
    <div>
      <h1>Smart Tractor</h1>
      <button onClick={() => setIsMapView(!isMapView)}>Toggle Map</button>
      <div style={{ display: "grid" }}>
        {/* {isMapView && <MapContainer />} */}
        <form>
          <label>
            Speed:
            <Form.Control type="text" value={commands.speed} onChange={(e) => setCommands({ ...commands, speed: e.target.value })} />
          </label>
          <label>
            Angle:
            <Form.Control type="text" value={commands.angle} onChange={(e) => setCommands({ ...commands, angle: e.target.value })} />
          </label>
          <label>
            Direction:
            <Form.Control type="text" value={commands.direction} onChange={(e) => setCommands({ ...commands, direction: e.target.value })} />
          </label>
          <Button onClick={handleSubmit}>Submit</Button>
        </form>
        <br />
        <h2>Robot Status</h2>
        <DataTable />
      </div>

    </div >
  );
}

export default App;
