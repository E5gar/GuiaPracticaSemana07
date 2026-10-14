import { useCallback, useMemo, useRef, useState } from 'react'
import { Search, X, TriangleAlert } from 'lucide-react'
import { puestos } from '../data/puestos'
import { productos } from '../data/productos'
import ProductoCard from './ProductoCard'

const LIMITE = 40
const MAXIMO_VISIBLE = 12
const permitido = /^[\p{L}\p{N}\s.-]*$/u
const sugerencias = ['papa', 'trucha', 'queso', 'mate', 'miel', 'chullo']

const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()

const indice = productos.map((producto) => {
  const puesto = puestos.find((p) => p.id === producto.puestoId)
  return {
    producto,
    puesto,
    clave: normalizar(`${producto.nombre} ${producto.detalle} ${puesto.nombre} ${puesto.rubro}`),
  }
})

function Buscador() {
  const [texto, setTexto] = useState('')
  const entrada = useRef(null)

  const valido = permitido.test(texto)
  const consulta = normalizar(texto)
  const hayConsulta = consulta.length > 0

  const resultados = useMemo(() => {
    if (!valido || !hayConsulta) return []
    const palabras = consulta.split(/\s+/)
    return indice.filter((item) => palabras.every((palabra) => item.clave.includes(palabra)))
  }, [valido, hayConsulta, consulta])

  const cambiar = useCallback((e) => setTexto(e.target.value), [])

  const elegir = useCallback((sugerencia) => {
    setTexto(sugerencia)
    entrada.current.focus()
  }, [])

  const limpiar = useCallback(() => {
    setTexto('')
    entrada.current.focus()
  }, [])

  let aviso = null
  if (!valido) aviso = 'Solo se permiten letras, números, espacios, punto y guion.'
  else if (texto.length > 0 && !hayConsulta) aviso = 'Escribe una palabra, no solo espacios.'
  else if (texto.length >= LIMITE) aviso = `Llegaste al máximo de ${LIMITE} caracteres.`
  else if (hayConsulta && resultados.length === 0) aviso = `Sin coincidencias para "${texto.trim()}".`

  return (
    <section id="buscador" className="border-b border-linea bg-arena">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-tinta/75">03 / Buscador</p>
          <h2 className="mt-4 font-serif text-5xl leading-none md:text-7xl">
            ¿Qué se te antoja <em>este domingo</em>?
          </h2>

          <div className="relative mt-10">
            <Search size={22} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2" />
            <input
              ref={entrada}
              type="text"
              value={texto}
              maxLength={LIMITE}
              onChange={cambiar}
              placeholder="Papa, trucha, mate..."
              aria-label="Buscar productos"
              aria-invalid={!valido}
              className="w-full border-b-2 border-tinta bg-transparent py-4 pl-10 pr-10 font-serif text-4xl outline-none placeholder:text-tinta/50"
            />
            {texto && (
              <button
                onClick={limpiar}
                aria-label="Borrar búsqueda"
                className="absolute right-0 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full hover:bg-tinta hover:text-papel"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="mt-3 flex items-start justify-between gap-4 text-sm" role="status" aria-live="polite">
            <p className="flex items-center gap-2">
              {aviso && <TriangleAlert size={16} className="shrink-0 text-brasa" />}
              {aviso ?? (hayConsulta ? `${resultados.length} productos encontrados` : '')}
            </p>
            <span className="tabular-nums text-tinta/75">
              {texto.length}/{LIMITE}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {sugerencias.map((sugerencia) => (
              <button
                key={sugerencia}
                onClick={() => elegir(sugerencia)}
                className="rounded-full border border-tinta px-4 py-1.5 text-sm transition-colors hover:bg-tinta hover:text-papel"
              >
                {sugerencia}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-64 border border-linea bg-papel p-5">
          {resultados.length > 0 ? (
            <>
              <ul>
                {resultados.slice(0, MAXIMO_VISIBLE).map(({ producto, puesto }) => (
                  <ProductoCard key={producto.id} producto={producto} puesto={puesto} />
                ))}
              </ul>
              {resultados.length > MAXIMO_VISIBLE && (
                <p className="mt-4 text-sm text-tenue">y {resultados.length - MAXIMO_VISIBLE} más. Afina tu búsqueda.</p>
              )}
            </>
          ) : (
            <p className="grid h-full min-h-56 place-items-center text-center font-serif text-3xl text-tenue">
              Sin Resultados
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Buscador