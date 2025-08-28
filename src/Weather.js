import React from "react";

const Weather = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="weather-info">
      <h2>
        {data.name}, {data.sys.country}
      </h2>
      <img src={iconUrl} alt={data.weather[0].description} />
      <p className="temp">{Math.round(data.main.temp)}°C</p>
      <p>{data.weather[0].main}</p>
      <div className="details">
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default Weather;
