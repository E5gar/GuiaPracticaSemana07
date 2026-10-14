import { Contrast, Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const muestras = [
  { nombre: 'Papel', clase: 'bg-papel' },
  { nombre: 'Arena', clase: 'bg-arena' },
  { nombre: 'Brasa', clase: 'bg-brasa' },
  { nombre: 'Tinta', clase: 'bg-tinta' },
]

function SelectorTema() {
  const { tema, alternar, ponerClaro, ponerOscuro } = useTheme()

  return (
    <article className="h-full border border-linea bg-papel p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-tenue">Contexto / useContext</p>
      <h3 className="mt-2 font-serif text-4xl leading-none">Luz de la feria</h3>

      <p className="mt-8 text-sm text-tenue">Tema actual</p>
      <p className="font-serif text-7xl leading-none">{tema === 'claro' ? 'Claro' : 'Oscuro'}</p>

      <ul className="mt-8 grid grid-cols-4 border border-linea">
        {muestras.map((muestra) => (
          <li key={muestra.nombre} className="border-r border-linea last:border-r-0">
            <span className={`block h-14 ${muestra.clase}`} />
            <span className="block px-2 py-2 text-xs uppercase tracking-[0.18em]">{muestra.nombre}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={alternar}
          className="inline-flex items-center gap-2 rounded-full border border-tinta bg-tinta px-5 py-2.5 text-sm font-medium text-papel transition-colors hover:border-brasa hover:bg-brasa"
        >
          <Contrast size={16} />
          Alternar tema
        </button>
        <button
          onClick={ponerClaro}
          aria-pressed={tema === 'claro'}
          className="inline-flex items-center gap-2 rounded-full border border-tinta px-5 py-2.5 text-sm font-medium transition-colors hover:bg-tinta hover:text-papel aria-pressed:bg-suave"
        >
          <Sun size={16} />
          Tema claro
        </button>
        <button
          onClick={ponerOscuro}
          aria-pressed={tema === 'oscuro'}
          className="inline-flex items-center gap-2 rounded-full border border-tinta px-5 py-2.5 text-sm font-medium transition-colors hover:bg-tinta hover:text-papel aria-pressed:bg-suave"
        >
          <Moon size={16} />
          Tema oscuro
        </button>
      </div>
    </article>
  )
}

export default SelectorTema