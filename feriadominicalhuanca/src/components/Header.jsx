import { useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const enlaces = [
  { href: '#avenida', texto: 'Avenida' },
  { href: '#puestos', texto: 'Puestos' },
  { href: '#buscador', texto: 'Buscador' },
  { href: '#mesa', texto: 'Mesa de control' },
]

function Header() {
  const [abierto, setAbierto] = useState(false)
  const { tema, alternar } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-linea bg-papel/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#inicio" className="flex items-baseline gap-3">
          <span className="font-serif text-2xl leading-none">Feria Dominical</span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-tenue sm:inline">Huancayo</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {enlaces.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="text-sm font-medium text-tenue transition-colors hover:text-tinta"
            >
              {enlace.texto}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={alternar}
            aria-label="Alternar tema"
            className="grid size-10 place-items-center rounded-full border border-linea transition-colors hover:border-tinta"
          >
            {tema === 'claro' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setAbierto(!abierto)}
            aria-expanded={abierto}
            aria-label="Menú"
            className="grid size-10 place-items-center rounded-full border border-linea md:hidden"
          >
            {abierto ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {abierto && (
        <nav aria-label="Móvil" className="border-t border-linea bg-papel md:hidden">
          {enlaces.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              onClick={() => setAbierto(false)}
              className="block border-b border-linea px-5 py-4 font-serif text-2xl last:border-b-0"
            >
              {enlace.texto}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Header