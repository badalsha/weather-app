import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const apiKey = "498cc334addf3729d0eea078f5fec44d";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/weather", (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(url)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            res.status(500).send('Error fetching weather data');
        });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});