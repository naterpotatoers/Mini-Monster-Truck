import os from "os";
import cors from 'cors'
import express from "express";
import mysql from "mysql";
import MOCK_DATA from "./mock_data.json";

const port = 5000;
const app = express();
const networkInterfaces = os.networkInterfaces();

let status = { gps_coordinates: { lat: 0, lng: 0 }, temperature: 0, humidity: 0, pressure: 0, battery: 0, co2: 0, soil_moisture: 0 };
let commands = { speed: 0, angle: 0, direction: 0 }

export const connection = mysql.createConnection({
    host: "fitlog-db.cfxqvwupnsia.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "Leanahtan523509",
    database: "mmt",
});


connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database!");
});

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Mission Control Web Server - Built using ExpressJS");
});

app.get("/commands", (req, res) => {
    console.log("GET /commands");
    res.json(commands);
});

app.post("/commands", (req, res) => {
    commands = req.body;
    console.log(req.body)
    console.log("POST /commands");
    res.send("MMT Data Received");
});

app.get("/status", (req, res) => {
    console.log("GET /status");
    res.json(status);
});

app.post("/status", (req, res) => {
    status = req.body;
    console.log(req.body)
    console.log("POST /status");
    res.send("Status Data Received");
});

app.listen(port, () => {
    console.log(`Server: http://localhost:5000`);
    for (const key in networkInterfaces) {
        const networkInterface = networkInterfaces[key];
        for (const network of networkInterface as any) {
            if (network.family === "IPv4" && !network.internal) {
                console.log(`Network: http://${network.address}:${port}`);
            }
        }
    }
});