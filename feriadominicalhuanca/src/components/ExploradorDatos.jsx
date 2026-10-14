import { useState } from 'react'
import { Users, Package, FileText, Ban, LoaderCircle, CircleAlert } from 'lucide-react'
import { useFetch } from '../hooks/useFetch'

const opciones = [
  { id: 'usuarios', etiqueta: 'Mostrar usuarios', icono: Users, url: 'https://jsonplaceholder.typicode.com/users' },
  { id: 'productos', etiqueta: 'Mostrar productos', icono: Package, url: 'https://dummyjson.com/products?limit=6' },
  { id: 'posts', etiqueta: 'Mostrar posts', icono: FileText, url: 'https://jsonplaceholder.typicode.com/posts?_limit=6' },
  { id: 'error', etiqueta: 'Mostrar error 404', icono: Ban, url: 'https://jsonplaceholder.typicode.com/feria-inexistente' },
]

function ExploradorDatos() {
  const [vista, setVista] = useState(null)
  const actual = opciones.find((opcion) => opcion.id === vista)
  const { datos, cargando, error } = useFetch(actual ? actual.url : null)

  const lista = vista === 'productos' ? datos?.products : datos

  return (
    <article className="border border-linea bg-papel p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-tenue">Datos / fetch + useEffect</p>
      <h3 className="mt-2 font-serif text-4xl leading-none">Explorador de datos</h3>

      <div className="mt-8 flex flex-wrap gap-3">
        {opciones.map((opcion) => {
          const Icono = opcion.icono
          const activa = opcion.id === vista
          return (
            <button
              key={opcion.id}
              onClick={() => setVista(opcion.id)}
              aria-pressed={activa}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                activa ? 'border-tinta bg-tinta text-papel' : 'border-tinta hover:bg-tinta hover:text-papel'
              }`}
            >
              <Icono size={16} />
              {opcion.etiqueta}
            </button>
          )
        })}
      </div>

      <div className="mt-8 min-h-56 border-t-2 border-tinta pt-6" aria-live="polite">
        {!vista && <p className="font-serif text-3xl text-tenue">Elige una opción para consultar la API.</p>}

        {cargando && (
          <p className="flex items-center gap-3">
            <LoaderCircle size={20} className="animate-spin" />
            Consultando datos...
          </p>
        )}

        {error && (
          <p className="flex items-center gap-3 border-l-4 border-brasa bg-suave p-4">
            <CircleAlert size={20} className="shrink-0 text-brasa" />
            {error}
          </p>
        )}

        {lista && vista === 'usuarios' && (
          <ul className="grid gap-x-8 md:grid-cols-2">
            {lista.map((usuario) => (
              <li key={usuario.id} className="border-b border-linea py-3">
                <p className="font-serif text-2xl leading-none">{usuario.name}</p>
                <p className="mt-1 text-sm text-tenue">
                  {usuario.email} / {usuario.company.name}
                </p>
              </li>
            ))}
          </ul>
        )}

        {lista && vista === 'productos' && (
          <ul className="grid gap-x-8 md:grid-cols-2">
            {lista.map((producto) => (
              <li key={producto.id} className="flex items-center gap-4 border-b border-linea py-3">
                <img src={producto.thumbnail} alt="Lorem ipsum dolor" className="size-16 shrink-0 bg-suave object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{producto.title}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-tenue">{producto.category}</p>
                </div>
                <p className="font-serif text-2xl">$ {producto.price}</p>
              </li>
            ))}
          </ul>
        )}

        {lista && vista === 'posts' && (
          <ul className="grid gap-x-8 md:grid-cols-2">
            {lista.map((post) => (
              <li key={post.id} className="border-b border-linea py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-tenue">Post {String(post.id).padStart(2, '0')}</p>
                <p className="mt-1 font-serif text-2xl leading-tight first-letter:uppercase">{post.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-tenue">{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export default ExploradorDatos