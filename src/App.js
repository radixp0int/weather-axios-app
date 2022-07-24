import React, { useState } from "react";
import axios from "axios";

import env from "react-dotenv";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${env.API_URL}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{data.main?.temp.toFixed(1)}°F</h1>
            ) : (
              <h2>React Weather App</h2>
            )}
          </div>
          <div className="description">
            {data.weather ? (
              <p className="bold">{data.weather[0].main}</p>
            ) : null}
          </div>
        </div>

        <div className="search-box">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="temp-feels">
              <p>Feels Like</p>
              {data.main ? (
                <p className="bold">{data.main?.feels_like.toFixed(1)}°F</p>
              ) : null}
            </div>
            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <p>Wind Speed</p>
              {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
