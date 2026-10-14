import { useState } from 'react'
import { Plus, Minus, RotateCcw } from 'lucide-react'

function Contador() {
  const [numero, setNumero] = useState(0)
  const [accion, setAccion] = useState('Ninguna')
  const [renders, setRenders] = useState(0)

  const aplicar = (cambio, nombre) => {
    setNumero((actual) => actual + cambio)
    setAccion(nombre)
    setRenders((actual) => actual + 1)
  }

  const reiniciar = () => {
    setNumero(0)
    setAccion('Reset')
    setRenders(0)
  }

  return (
    <article className="h-full border border-linea bg-papel p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-tenue">Estado local / useState</p>
      <h3 className="mt-2 font-serif text-4xl leading-none">Costales en la canasta</h3>

      <p aria-live="polite" className="mt-8 font-serif text-9xl leading-none tabular-nums">
        {numero}
      </p>

      <dl className="mt-8 grid grid-cols-2 border-y border-linea">
        <div className="border-r border-linea py-4 pr-4">
          <dt className="text-xs uppercase tracking-[0.18em] text-tenue">Re-renders</dt>
          <dd className="mt-1 font-serif text-3xl tabular-nums">{renders}</dd>
        </div>
        <div className="py-4 pl-4">
          <dt className="text-xs uppercase tracking-[0.18em] text-tenue">Última acción</dt>
          <dd className="mt-1 font-serif text-3xl">{accion}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => aplicar(-1, 'Restar')}
          className="inline-flex items-center gap-2 rounded-full border border-tinta px-5 py-2.5 text-sm font-medium transition-colors hover:bg-tinta hover:text-papel"
        >
          <Minus size={16} />
          Restar
        </button>
        <button
          onClick={() => aplicar(1, 'Sumar')}
          className="inline-flex items-center gap-2 rounded-full border border-tinta bg-tinta px-5 py-2.5 text-sm font-medium text-papel transition-colors hover:border-brasa hover:bg-brasa"
        >
          <Plus size={16} />
          Sumar
        </button>
        <button
          onClick={reiniciar}
          className="inline-flex items-center gap-2 rounded-full border border-linea px-5 py-2.5 text-sm font-medium transition-colors hover:border-tinta"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </article>
  )
}

export default Contador