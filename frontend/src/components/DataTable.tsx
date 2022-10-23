import React from 'react'
import Table from 'react-bootstrap/Table';

export default function DataTable() {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Coordinates</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                    <th>Soil Moisture</th>
                    <th>Air Quality</th>
                    <th>CO2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2021-05-01</td>
                    <td>37.3373 N, -122.8826 W</td>
                    <td>65°F</td>
                    <td>30%</td>
                    <td>40%</td>
                    <td>Good</td>
                    <td>551ppm</td>
                </tr>
                <tr>
                    <td>2021-05-02</td>
                    <td>37.3374 N, -121.8822 W</td>
                    <td>71°F</td>
                    <td>45%</td>
                    <td>51%</td>
                    <td>Good</td>
                    <td>510ppm</td>
                </tr>
                <tr>
                    <td>2021-05-03</td>
                    <td>37.7749° N, -122.8821 W</td>
                    <td>75°F</td>
                    <td>23%</td>
                    <td>32%</td>
                    <td>Good</td>
                    <td>490ppm</td>
                </tr>
                <tr>
                    <td>2021-05-04</td>
                    <td>37.7749° N, 122.8824 W</td>
                    <td>81°F</td>
                    <td>45%</td>
                    <td>48%</td>
                    <td>Good</td>
                    <td>576ppm</td>
                </tr>
            </tbody>
        </Table>
    )
}