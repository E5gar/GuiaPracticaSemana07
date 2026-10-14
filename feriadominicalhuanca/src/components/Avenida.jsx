import { ArrowRight } from 'lucide-react'
import { puestos } from '../data/puestos'

const cuadras = [1, 2, 3, 4, 5].map((numero) => ({
  numero,
  puestos: puestos.filter((puesto) => puesto.cuadra === numero),
}))

function Avenida({ cuadra, onSelect }) {
  const activa = cuadras.find((c) => c.numero === cuadra)

  return (
    <section id="avenida" className="border-b border-linea">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-brasa">01 / Plano</p>
            <h2 className="mt-4 font-serif text-5xl leading-none md:text-7xl">
              Cinco cuadras sobre la <em>Av. Huancavelica</em>
            </h2>
          </div>
          <p className="text-tenue">
            La feria corre paralela a la Calle Real.
          </p>
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-tenue">
            <span>Calle Real</span>
            <span className="flex-1 border-t border-dashed border-tenue" />
          </div>

          <ol className="mt-4 grid border-y-4 border-tinta md:grid-cols-5">
            {cuadras.map((c) => {
              const seleccionada = c.numero === cuadra
              return (
                <li
                  key={c.numero}
                  className="border-b border-linea last:border-b-0 md:border-b-0 md:border-l md:first:border-l-0"
                >
                  <button
                    onClick={() => onSelect(seleccionada ? 0 : c.numero)}
                    aria-pressed={seleccionada}
                    className={`flex h-full w-full flex-col gap-8 p-5 text-left transition-colors ${
                      seleccionada ? 'bg-tinta text-papel' : 'hover:bg-suave'
                    }`}
                  >
                    <span className="flex items-start justify-between">
                      <span className="font-serif text-7xl leading-none">{c.numero}</span>
                      <span className="text-xs uppercase tracking-[0.18em]">Cuadra</span>
                    </span>
                    <span className="flex gap-1.5">
                      {c.puestos.map((puesto) => (
                        <span key={puesto.id} className="size-3 bg-brasa" />
                      ))}
                    </span>
                    <span className="text-sm">{c.puestos.map((puesto) => puesto.rubro).join(' / ')}</span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="mt-4 flex items-center gap-4 text-xs uppercase tracking-[0.18em]">
            <span>Av. Huancavelica</span>
            <span className="h-px flex-1 bg-tinta" />
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <p>
            {activa
              ? `Cuadra ${activa.numero}: ${activa.puestos.length} puestos`
              : `Toda la avenida: ${puestos.length} puestos`}
          </p>
          {activa && (
            <button onClick={() => onSelect(0)} className="underline underline-offset-4 hover:text-brasa">
              Ver toda la avenida
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Avenida