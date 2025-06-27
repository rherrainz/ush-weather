import { useEffect, useState } from "react";

function calcularPorcentaje(arr, condicion) {
  const total = arr.length;
  const cumplidos = arr.filter(condicion).length;
  return Math.round((cumplidos / total) * 100);
}

export default function CerroCastor() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-54.75&longitude=-68.03&hourly=precipitation,snowfall,windspeed_10m&daily=precipitation_sum,snowfall_sum,windspeed_10m_max&timezone=America%2FArgentina%2FUshuaia"
    )
      .then((res) => res.json())
      .then((json) => {
        const porcentajes = {
          nieve24h: calcularPorcentaje(json.hourly.snowfall.slice(0, 24), v => v > 0),
          lluvia24h: calcularPorcentaje(json.hourly.precipitation.slice(0, 24), v => v > 0),
          viento24h: calcularPorcentaje(json.hourly.windspeed_10m.slice(0, 24), v => v > 45),
          nieve7d: calcularPorcentaje(json.daily.precipitation_sum.slice(0, 7), v => v > 0),
          lluvia7d: calcularPorcentaje(json.daily.snowfall_sum.slice(0, 7), v => v > 0),
          viento7d: calcularPorcentaje(json.daily.windspeed_10m_max.slice(0, 7), v => v > 45),
        };
        setData(porcentajes);
      });
  }, []);

  if (!data) return <div className="p-4 text-center">Cargando datos del cerro...</div>;

  const cuadro = (label, valor) => (
    <div className="bg-white rounded-2xl shadow p-4 text-center">
      <div className="text-lg font-semibold mb-2">{label}</div>
      <div className="text-3xl font-bold">{valor}%</div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
      {cuadro("Nieve próximas 24h", data.nieve24h)}
      {cuadro("Nieve próxima semana", data.nieve7d)}
      {cuadro("Lluvia próximas 24h", data.lluvia24h)}
      {cuadro("Lluvia próxima semana", data.lluvia7d)}
      {cuadro("Vientos fuertes 24h", data.viento24h)}
      {cuadro("Vientos fuertes semana", data.viento7d)}
    </div>
  );
}
