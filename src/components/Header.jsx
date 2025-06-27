import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-800 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between shadow">
      <h1 className="text-xl font-bold">Clima Ushuaia</h1>
      <nav className="flex gap-4 mt-2 sm:mt-0">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/graphics" className="hover:underline">Gráfico</Link>
        <Link to="/cerro-castor" className="hover:underline">Cerro Castor</Link>
      </nav>
    </header>
  );
}
