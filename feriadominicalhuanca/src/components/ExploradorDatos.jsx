import { useState } from 'react';
import {
  Users,
  FileText,
  Ban,
  LoaderCircle,
  CircleAlert,
  MessageSquare,
  BadgeCheck,
  MapPin,
} from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { puestos } from '../data/puestos';

const URL_COMENTARIOS =
  'https://jsonplaceholder.typicode.com/comments?postId=1&postId=2&postId=3&postId=4';

const opciones = [
  {
    id: 'usuarios',
    etiqueta: 'Mostrar usuarios',
    icono: Users,
    url: 'https://jsonplaceholder.typicode.com/users',
  },
  {
    id: 'posts',
    etiqueta: 'Mostrar posts',
    icono: FileText,
    url: 'https://jsonplaceholder.typicode.com/posts?_limit=4',
  },
  {
    id: 'error',
    etiqueta: 'Mostrar error 404',
    icono: Ban,
    url: 'https://jsonplaceholder.typicode.com/feria-inexistente',
  },
];

const publicaciones = [
  {
    puestoId: 1,
    titulo: 'Llegó la papa huayro nueva',
    cuerpo:
      'Esta madrugada bajaron los primeros costales de la cosecha. Hay huayro, mashua y olluco rosado hasta que se acabe.',
    respuestas: [
      'Reservé dos kilos de huayro para el domingo. ¿Guardan hasta las diez?',
      'La mashua amarilla del mes pasado quedó riquísima en sopa. Voy por más.',
      'Pasé por la cuadra 1 y ya había cola. Vale la pena madrugar.',
    ],
  },
  {
    puestoId: 2,
    titulo: 'Truchas frescas desde Ingenio',
    cuerpo:
      'Sacamos las truchas de la poza ayer por la tarde. Las hay enteras, en filete y ahumadas, y el ceviche sale al momento.',
    respuestas: [
      'El filete sin espinas es ideal para los niños. Lo recomiendo.',
      'Probé el ceviche con camote y choclo. Repetiría sin dudarlo.',
      '¿La trucha ahumada aguanta hasta el lunes en la refrigeradora?',
    ],
  },
  {
    puestoId: 5,
    titulo: 'Nuevos mates burilados de Cochas',
    cuerpo:
      'El taller terminó una tanda con escenas de huaylarsh y siembra. Hay desde llaveros hasta platos para colgar.',
    respuestas: [
      'Compré el mate mediano para regalo. El detalle del tallado es increíble.',
      '¿Aceptan encargos con el nombre de una familia?',
      'Me encantaron las escenas de fiesta. Se nota el trabajo de semanas.',
    ],
  },
  {
    puestoId: 9,
    titulo: 'Menú de la picantería para este domingo',
    cuerpo:
      'Papa a la huancaína, cuy chactado y chicharrón con mote. La mazamorra morada sale tibia a partir del mediodía.',
    respuestas: [
      'El cuy chactado crocante, como debe ser. Nos fuimos felices.',
      'Pedí la huancaína de entrada y casi no llego al segundo.',
      'La mazamorra tibia al final de la cuadra 5 cae perfecta.',
    ],
  },
];

const iniciales = (nombre) =>
  nombre
    .replace(/^(Mrs?|Ms|Dr)\.\s+/, '')
    .split(' ')
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');

function ExploradorDatos() {
  const [vista, setVista] = useState(null);
  const actual = opciones.find((opcion) => opcion.id === vista);

  const principal = useFetch(actual ? actual.url : null);
  const comentarios = useFetch(vista === 'posts' ? URL_COMENTARIOS : null);

  const cargando = principal.cargando || comentarios.cargando;
  const error = principal.error || comentarios.error;
  const datos = principal.datos;

  return (
    <article className="border border-linea bg-papel p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-tenue">Datos / fetch + useEffect</p>
      <h3 className="mt-2 font-serif text-4xl leading-none">Explorador de datos</h3>

      <div className="mt-8 flex flex-wrap gap-3">
        {opciones.map((opcion) => {
          const Icono = opcion.icono;
          const activa = opcion.id === vista;
          return (
            <button
              key={opcion.id}
              onClick={() => setVista(opcion.id)}
              aria-pressed={activa}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                activa
                  ? 'border-tinta bg-tinta text-papel'
                  : 'border-tinta hover:bg-tinta hover:text-papel'
              }`}
            >
              <Icono size={16} />
              {opcion.etiqueta}
            </button>
          );
        })}
      </div>

      <div className="mt-8 min-h-56 border-t-2 border-tinta pt-6" aria-live="polite">
        {!vista && (
          <p className="font-serif text-3xl text-tenue">Consultas API</p>
        )}

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

        {datos && vista === 'usuarios' && (
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-sm text-tenue">
              <Users size={16} />
              {datos.length} usuarios registrados
            </p>
            <ul className="grid gap-x-8 md:grid-cols-2">
              {datos.map((usuario) => (
                <li
                  key={usuario.id}
                  className="grid grid-cols-[auto_1fr] gap-4 border-b border-linea py-4"
                >
                  <span className="grid size-11 place-items-center bg-tinta font-serif text-xl text-papel">
                    {iniciales(usuario.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif text-2xl leading-none">{usuario.name}</p>
                    <p className="mt-1 truncate text-sm text-tenue">
                      @{usuario.username} / {usuario.email}
                    </p>
                    <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={12} className="text-brasa" />
                        {usuario.address.city}
                      </span>
                      <span className="inline-flex items-center gap-1 uppercase tracking-[0.18em] text-brasa">
                        <BadgeCheck size={14} />
                        Registrado
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {datos && comentarios.datos && vista === 'posts' && (
          <ul className="space-y-10">
            {datos.map((post, indice) => {
              const publicacion = publicaciones[indice % publicaciones.length];
              const puesto = puestos.find((p) => p.id === publicacion.puestoId);
              const respuestas = comentarios.datos.filter((c) => c.postId === post.id).slice(0, 3);
              return (
                <li key={post.id}>
                  <p className="text-xs uppercase tracking-[0.18em] text-tenue">
                    Post {String(post.id).padStart(2, '0')} / Cuadra {puesto.cuadra} /{' '}
                    {puesto.nombre}
                  </p>
                  <h4 className="mt-2 font-serif text-3xl leading-tight">{publicacion.titulo}</h4>
                  <p className="mt-2 max-w-2xl text-tenue">{publicacion.cuerpo}</p>

                  <p className="mt-6 inline-flex items-center gap-2 text-sm">
                    <MessageSquare size={16} />
                    {respuestas.length} comentarios
                  </p>
                  <ul className="mt-3 border-l-2 border-tinta pl-5">
                    {respuestas.map((comentario, posicion) => (
                      <li
                        key={comentario.id}
                        className="grid grid-cols-[auto_1fr] gap-3 border-b border-linea py-3 last:border-b-0"
                      >
                        <span className="grid size-9 place-items-center bg-suave font-serif text-lg">
                          {comentario.email[0].toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs text-tenue">{comentario.email}</p>
                          <p className="mt-1">{publicacion.respuestas[posicion]}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </article>
  );
}

export default ExploradorDatos;
