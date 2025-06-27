import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-54.8&longitude=-68.3&hourly=precipitation,snowfall,windspeed_10m&timezone=America%2FArgentina%2FUshuaia"
    )
      .then((res) => res.json())
      .then((json) => {
        const hourly = json.hourly;
        const formatted = hourly.time.map((t, i) => ({
          hora: t.slice(11, 16),
          lluvia: hourly.precipitation[i],
          nieve: hourly.snowfall[i],
          viento: hourly.windspeed_10m[i],
        }));
        setData(formatted.slice(0, 24));
      });
  }, []);

  return (
    <main className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Pronóstico horario para Ushuaia
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="lluvia" stroke="#8884d8" name="Lluvia (mm)" />
          <Line yAxisId="left" type="monotone" dataKey="nieve" stroke="#00c49f" name="Nieve (cm)" />
          <Line yAxisId="right" type="monotone" dataKey="viento" stroke="#ff7300" name="Viento (km/h)" />
        </LineChart>
      </ResponsiveContainer>
    </main>
  );
}
