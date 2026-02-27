"use client";

import { useState, useEffect } from "react";

interface TopBarProps {
  location?: string;
}

export default function TopBar({ location = "Kathmandu, Nepal" }: TopBarProps) {
  const [weather, setWeather] = useState<{
    condition: string;
    temp: string;
    icon: string;
  } | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  // Update time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format date: "Fri, 19 November"
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
      });
      
      // Format time: "1:00 pm"
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      
      setCurrentDate(dateStr);
      setCurrentTime(timeStr);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using Open-Meteo API (free, no API key needed)
        // Coordinates for Kathmandu: 27.7172°N, 85.3240°E
        const lat = 27.7172;
        const lon = 85.3240;
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
        );
        const data = await response.json();
        
        if (data.current) {
          const temp = Math.round(data.current.temperature_2m);
          const weatherCode = data.current.weather_code;
          
          // Weather code to condition mapping
          const condition = getWeatherCondition(weatherCode);
          const icon = getWeatherIcon(weatherCode);
          
          setWeather({
            condition,
            temp: `${temp}°C`,
            icon,
          });
        }
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        // Fallback
        setWeather({
          condition: "Cloudy",
          temp: "16°C",
          icon: "🌤",
        });
      }
    };

    fetchWeather();
    // Update weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  // Map weather codes to conditions
  const getWeatherCondition = (code: number): string => {
    if (code === 0) return "Clear";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 82) return "Rain Showers";
    if (code <= 86) return "Snow Showers";
    if (code <= 99) return "Thunderstorm";
    return "Cloudy";
  };

  // Map weather codes to emoji icons
  const getWeatherIcon = (code: number): string => {
    if (code === 0) return "☀️";
    if (code <= 3) return "🌤";
    if (code <= 48) return "🌫";
    if (code <= 67) return "🌧";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦";
    if (code <= 86) return "🌨";
    if (code <= 99) return "⛈";
    return "☁️";
  };

  return (
    <div className="bg-[#0B0140] text-white text-xs px-4 py-1 flex justify-between items-center">
      {/* Weather */}
      <span className="flex items-center gap-1">
        {weather ? (
          <>
            {weather.icon} {weather.condition} | {weather.temp}
          </>
        ) : (
          "Loading weather..."
        )}
      </span>
      
      {/* Date & Time */}
      <span>
        {currentDate && currentTime ? `${currentDate} | ${currentTime}` : "Loading..."}
      </span>
    </div>
  );
}