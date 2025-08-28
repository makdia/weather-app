import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import "./App.css";

const App = () => {
  const [coords, setCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [error, setError] = useState(null);

  const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          setError("Location access denied. Use the search field above.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchWeatherByCoords = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error("Failed to fetch weather");
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    if (coords) fetchWeatherByCoords();
  }, [coords]);

  const handleCitySearch = async (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">🌤️ Weather App</h1>
        <form onSubmit={handleCitySearch} className="search-form">
          <input
            type="text"
            placeholder="Enter city..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {error && <p className="error">{error}</p>}
        {weatherData && <Weather data={weatherData} />}
      </div>
    </div>
  );
};

export default App;
