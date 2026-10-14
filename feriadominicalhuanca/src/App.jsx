import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Avenida from './components/Avenida';
import Puestos from './components/Puestos';
import Buscador from './components/Buscador';
import Contador from './components/Contador';
import SimuladorCarga from './components/SimuladorCarga';
import SelectorTema from './components/SelectorTema';
import ExploradorDatos from './components/ExploradorDatos';
import Footer from './components/Footer';

function App() {
  const [cuadra, setCuadra] = useState(0);

  return (
    <div className="min-h-screen bg-papel font-sans text-tinta">
      <Header />
      <main>
        <Hero />
        <Avenida cuadra={cuadra} onSelect={setCuadra} />
        <Puestos cuadra={cuadra} onSelect={setCuadra} />
        <Buscador />
        <section id="mesa" className="bg-suave">
          <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
            <p className="text-xs uppercase tracking-[0.18em] text-brasa">04 / Mesa de control</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-none md:text-7xl">
              Lo que ocurre <em>detrás de la carpa</em>
            </h2>
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              <Contador />
              <SimuladorCarga />
              <SelectorTema />
              <div className="lg:col-span-2">
                <ExploradorDatos />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
