import { ArrowDown, Search } from 'lucide-react'
import { imagenHero, puestos } from '../data/puestos'
import { productos } from '../data/productos'

const cifras = [
  { valor: 5, etiqueta: 'cuadras' },
  { valor: puestos.length, etiqueta: 'puestos' },
  { valor: productos.length, etiqueta: 'productos' },
]

function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-arena">
      <img
        src={imagenHero}
        alt="Lorem ipsum dolor"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/55 via-black/55 to-black/85" />

      <div className="mx-auto flex min-h-[82vh] max-w-7xl flex-col justify-end px-5 pb-10 pt-32 text-white">
        <p className="text-xs uppercase tracking-[0.18em] text-white/80 motion-safe:animate-subir">
          Todos los domingos / Huancayo, Junín
        </p>
        <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.92] motion-safe:animate-subir md:text-9xl">
          Feria Dominical <em></em>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-white/85 motion-safe:animate-subir">
          Recorre puesto por puesto la feria que se extiende sobre la Av. Huancavelica, en paralelo a la Calle Real.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#avenida"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#141414] transition-colors hover:bg-[#d9d5ce]"
          >
            Recorrer la avenida
            <ArrowDown size={16} />
          </a>
          <a
            href="#buscador"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/15"
          >
            <Search size={16} />
            Buscar un producto
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-3 border-t border-white/30 pt-6">
          {cifras.map((cifra) => (
            <div key={cifra.etiqueta}>
              <dt className="text-xs uppercase tracking-[0.18em] text-white/75">{cifra.etiqueta}</dt>
              <dd className="mt-1 font-serif text-5xl leading-none md:text-6xl">{cifra.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Hero