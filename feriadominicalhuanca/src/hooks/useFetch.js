import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [resultado, setResultado] = useState({ url: null, datos: null, error: null })

  useEffect(() => {
    if (!url) return
    const controlador = new AbortController()

    fetch(url, { signal: controlador.signal })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(
            respuesta.status === 404
              ? 'Error 404: el recurso solicitado no existe'
              : `Error ${respuesta.status}: no se pudo completar la solicitud`,
          )
        }
        return respuesta.json()
      })
      .then((datos) => setResultado({ url, datos, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setResultado({ url, datos: null, error: error.message })
      })

    return () => controlador.abort()
  }, [url])

  const vigente = resultado.url === url

  return {
    datos: vigente ? resultado.datos : null,
    error: vigente ? resultado.error : null,
    cargando: Boolean(url) && !vigente,
  }
}