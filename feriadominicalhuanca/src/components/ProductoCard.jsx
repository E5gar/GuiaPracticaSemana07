import { MapPin } from 'lucide-react'

function ProductoCard({ producto, puesto }) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b border-linea py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="font-medium">{producto.nombre}</p>
        <p className="mt-0.5 text-xs text-tenue">{producto.detalle}</p>
        {puesto && (
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs">
            <MapPin size={12} className="text-brasa" />
            Cuadra {puesto.cuadra} / {puesto.nombre}
          </p>
        )}
      </div>
      <p className="text-right">
        <span className="font-serif text-2xl leading-none">S/ {producto.precio.toFixed(2)}</span>
        <span className="mt-1 block text-xs text-tenue">por {producto.unidad}</span>
      </p>
    </li>
  )
}

export default ProductoCard