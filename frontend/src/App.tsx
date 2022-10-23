import { useState, useRef } from 'react'
import DataTable from './components/DataTable';
import MapContainer from './components/MapContainer';


function App() {
  const [isMapView, setIsMapView] = useState(false)
  const commands = useRef({});
  return (
    <div>
      <h1>Smart Tractor</h1>
      <button onClick={() => setIsMapView(!isMapView)}>Toggle Map</button>
      <div style={{ display: "flex" }}>
        {isMapView && <MapContainer commands={commands} />}
        <DataTable />
      </div>

    </div >
  );
}

export default App;
