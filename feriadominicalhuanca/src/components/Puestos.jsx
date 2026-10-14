import { puestos } from '../data/puestos'
import PuestoCard from './PuestoCard'

function Puestos({ cuadra, onSelect }) {
  const visibles = cuadra === 0 ? puestos : puestos.filter((puesto) => puesto.cuadra === cuadra)

  return (
    <section id="puestos" className="border-b border-linea">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-brasa">02 / Puestos</p>
            <h2 className="mt-4 font-serif text-5xl leading-none md:text-7xl">
              {cuadra === 0 ? 'Todos los puestos' : `Puestos de la cuadra ${cuadra}`}
            </h2>
          </div>
          {cuadra !== 0 && (
            <button
              onClick={() => onSelect(0)}
              className="rounded-full border border-tinta px-5 py-2.5 text-sm font-medium transition-colors hover:bg-tinta hover:text-papel"
            >
              Mostrar todos
            </button>
          )}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibles.map((puesto) => (
            <PuestoCard key={puesto.id} puesto={puesto} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Puestos