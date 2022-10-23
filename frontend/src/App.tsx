import { useState } from 'react'
import DataTable from './components/DataTable';
import MapContainer from './components/MapContainer';


function App() {
  const [isMapView, setIsMapView] = useState(false)
  return (
    <div>
      <h1>Smart Tractor</h1>
      <button onClick={() => setIsMapView(!isMapView)}>Toggle Map</button>
      <div style={{ display: "flex" }}>
        {isMapView && <MapContainer />}
        <DataTable />
      </div>

    </div >
  );
}

export default App;
