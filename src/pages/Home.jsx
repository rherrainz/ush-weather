import { useEffect, useState } from "react";
import ProbabilityPanel from "../components/ProbabilityPanel";
import Graphics from "../components/Graphics";
import { API_USHUAIA } from "../utils/constants";

export default function Home() {
  const [probData, setProbData] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-54.8&longitude=-68.3&hourly=precipitation,snowfall,windspeed_10m&daily=precipitation_sum,snowfall_sum,windspeed_10m_max&timezone=America%2FArgentina%2FUshuaia"
    )
      .then((res) => res.json())
      .then((json) => {
        const hourly = json.hourly;
        const daily = json.daily;

        // Valores de 24 horas (0-23)
        const nieve24h = hourly.snowfall.slice(0, 24);
        const lluvia24h = hourly.precipitation.slice(0, 24);
        const viento24h = hourly.windspeed_10m.slice(0, 24);

        const nieve24 = (nieve24h.filter((n) => n > 0).length / 24) * 100;
        const lluvia24 = (lluvia24h.filter((p) => p > 0).length / 24) * 100;
        const viento24 = (viento24h.filter((v) => v > 45).length / 24) * 100;

        // Valores semanales (7 días)
        const nieve7 = (daily.snowfall_sum.filter((n) => n > 0).length / 7) * 100;
        const lluvia7 = (daily.precipitation_sum.filter((p) => p > 0).length / 7) * 100;
        const viento7 = (daily.windspeed_10m_max.filter((v) => v > 45).length / 7) * 100;

        setProbData({
          nieve24: Math.round(nieve24),
          lluvia24: Math.round(lluvia24),
          viento24: Math.round(viento24),
          nieve7d: Math.round(nieve7),
          lluvia7d: Math.round(lluvia7),
          viento7d: Math.round(viento7),
        });
      });
  }, []);


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Ushuaia</h1>
      {probData ? (
        <ProbabilityPanel {...probData} />
      ) : (
        <p className="text-center">Cargando datos...</p>
      )}
      <Graphics title="Pronóstico horario para Ushuaia" apiUrl={API_USHUAIA} />;
    </div>
  );
}