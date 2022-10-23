import { useState } from 'react';
import Map from './components/Map';

function App() {
  return (
    <div>
      <h1>Smart Tractor</h1>
      <Map />
      <table>
        <tr>
          <th>Date</th>
          <th>Coordinates</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Soil Moisture</th>
          <th>Air Quality</th>
          <th>CO2</th>
        </tr>
        <tr>
          <td>2021-05-01</td>
          <td>37.7749° N, 122.4194° W</td>
          <td>20°C</td>
          <td>50%</td>
          <td>50%</td>
          <td>Good</td>
          <td>500ppm</td>
        </tr>
        <tr>
          <td>2021-05-02</td>
          <td>37.7749° N, 122.4194° W</td>
          <td>20°C</td>
          <td>50%</td>
          <td>50%</td>
          <td>Good</td>
          <td>500ppm</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
