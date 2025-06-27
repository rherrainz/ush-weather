import { useEffect, useState } from "react";

function getIcon(type, value) {
  const symbol = type === "nieve" ? "❄️" : type === "lluvia" ? "🌧️" : "💨";
  if (value < 25) return symbol;
  if (value < 50) return symbol + symbol;
  return symbol + symbol + symbol;
}

function WeatherBox({ title, value, type }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl shadow text-center w-full sm:w-1/3">
      <div className="text-4xl mb-2">{getIcon(type, value)}</div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{title}</div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}%</div>
    </div>
  );
}

export default function ProbabilityPanel({ nieve24, lluvia24, viento24, nieve7d, lluvia7d, viento7d }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <WeatherBox title="Probabilidad de nieve (24 h)" value={nieve24} type="nieve" />
      <WeatherBox title="Probabilidad de lluvia (24 h)" value={lluvia24} type="lluvia" />
      <WeatherBox title="Probabilidad de vientos fuertes (24 h)" value={viento24} type="viento" />
      <WeatherBox title="Probabilidad de nieve (7 días)" value={nieve7d} type="nieve" />
      <WeatherBox title="Probabilidad de lluvia (7 días)" value={lluvia7d} type="lluvia" />
      <WeatherBox title="Probabilidad de vientos fuertes (7 días)" value={viento7d} type="viento" />
    </div>
  );
}
