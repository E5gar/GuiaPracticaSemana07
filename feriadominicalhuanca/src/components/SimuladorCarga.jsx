import { useEffect, useRef, useState } from 'react'
import { RefreshCw, CircleCheck, CircleAlert, Trash2, LoaderCircle, Info } from 'lucide-react'
import { puestos } from '../data/puestos'
import { productos } from '../data/productos'

const estilos = {
  reposo: { icono: Info, clase: 'border-linea' },
  cargando: { icono: LoaderCircle, clase: 'border-tinta' },
  listo: { icono: CircleCheck, clase: 'border-tinta' },
  exito: { icono: CircleCheck, clase: 'border-tinta' },
  error: { icono: CircleAlert, clase: 'border-brasa' },
  cleanup: { icono: Trash2, clase: 'border-tinta' },
}

function SimuladorCarga() {
  const [mensaje, setMensaje] = useState({ tipo: 'reposo', texto: 'Sin actividad.' })
  const [memoria, setMemoria] = useState(0)
  const [funcion, setFuncion] = useState('Ninguna')
  const [liberada, setLiberada] = useState(null)
  const temporizador = useRef(null)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  const simularCarga = () => {
    clearTimeout(temporizador.current)
    setFuncion('simularCarga()')
    setLiberada(null)
    setMensaje({ tipo: 'cargando', texto: 'Cargando puestos y productos de la feria...' })
    temporizador.current = setTimeout(() => {
      setMemoria((actual) => actual + 12.5)
      setMensaje({
        tipo: 'listo',
        texto: `Carga terminada: ${puestos.length} puestos y ${productos.length} productos en memoria.`,
      })
    }, 2200)
  }

  const mostrarExito = () => {
    clearTimeout(temporizador.current)
    setFuncion('mostrarExito()')
    setLiberada(null)
    setMemoria((actual) => actual + 1.2)
    setMensaje({ tipo: 'exito', texto: 'Operación completada correctamente.' })
  }

  const mostrarError = () => {
    clearTimeout(temporizador.current)
    setFuncion('mostrarError()')
    setLiberada(null)
    setMemoria((actual) => actual + 0.6)
    setMensaje({ tipo: 'error', texto: 'No se pudo conectar con el servidor.' })
  }

  const limpiarRecursos = () => {
    clearTimeout(temporizador.current)
    setFuncion('limpiarRecursos()')
    setLiberada(memoria)
    setMemoria(0)
    setMensaje({ tipo: 'cleanup', texto: 'Temporizadores y datos en memoria liberados.' })
  }

  const estilo = estilos[mensaje.tipo]
  const Icono = estilo.icono

  const botones = [
    { etiqueta: 'Simular carga', icono: RefreshCw, accion: simularCarga },
    { etiqueta: 'Mostrar éxito', icono: CircleCheck, accion: mostrarExito },
    { etiqueta: 'Mostrar error', icono: CircleAlert, accion: mostrarError },
    { etiqueta: 'Cleanup', icono: Trash2, accion: limpiarRecursos },
  ]

  return (
    <article className="h-full border border-linea bg-papel p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-tenue">Efectos / useEffect</p>
      <h3 className="mt-2 font-serif text-4xl leading-none">Carga de la feria</h3>

      <div
        role="status"
        aria-live="polite"
        className={`mt-8 flex min-h-24 items-start gap-3 border-l-4 bg-suave p-4 ${estilo.clase}`}
      >
        <Icono size={20} className={`mt-0.5 shrink-0 ${mensaje.tipo === 'cargando' ? 'animate-spin' : ''}`} />
        <p>{mensaje.texto}</p>
      </div>

      <dl className="mt-6 divide-y divide-linea border-y border-linea text-sm">
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-tenue">Función llamada</dt>
          <dd className="font-medium">{funcion}</dd>
        </div>
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-tenue">Memoria en uso</dt>
          <dd className="font-medium tabular-nums">{memoria.toFixed(1)} MB</dd>
        </div>
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-tenue">Memoria liberada</dt>
          <dd className="font-medium tabular-nums">{liberada === null ? 'Sin datos' : `${liberada.toFixed(1)} MB`}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        {botones.map((boton) => {
          const IconoBoton = boton.icono
          return (
            <button
              key={boton.etiqueta}
              onClick={boton.accion}
              className="inline-flex items-center gap-2 rounded-full border border-tinta px-5 py-2.5 text-sm font-medium transition-colors hover:bg-tinta hover:text-papel"
            >
              <IconoBoton size={16} />
              {boton.etiqueta}
            </button>
          )
        })}
      </div>
    </article>
  )
}

export default SimuladorCarga