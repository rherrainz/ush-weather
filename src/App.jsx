import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CerroCastor from "./pages/CerroCastor";
import Graphics from "./components/Graphics";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cerro-castor" element={<CerroCastor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
