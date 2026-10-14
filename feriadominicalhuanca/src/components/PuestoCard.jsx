import { MapPin } from 'lucide-react'
import { productos } from '../data/productos'
import ProductoCard from './ProductoCard'

function PuestoCard({ puesto }) {
  const lista = productos.filter((producto) => producto.puestoId === puesto.id)

  return (
    <article className="group flex flex-col border border-linea">
      <div className="relative aspect-[4/3] overflow-hidden bg-arena">
        <img
          src={puesto.imagen}
          alt="Lorem ipsum dolor"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/65" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-papel px-2.5 py-1 text-xs text-tinta">
          <MapPin size={12} />
          Cuadra {puesto.cuadra}
        </span>
        <div className="absolute inset-x-4 bottom-4 text-white">
          <p className="text-xs uppercase tracking-[0.18em] text-white/85">{puesto.rubro}</p>
          <h3 className="mt-1 font-serif text-3xl leading-none">{puesto.nombre}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-tenue">{puesto.descripcion}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.18em]">Atiende {puesto.responsable}</p>
        <ul className="mt-4 border-t-2 border-tinta">
          {lista.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </ul>
      </div>
    </article>
  )
}

export default PuestoCard