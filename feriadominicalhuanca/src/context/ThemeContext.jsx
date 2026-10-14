import { useEffect, useState } from 'react'
import { ThemeContext } from '../hooks/useTheme'

function temaInicial() {
  const guardado = localStorage.getItem('feria-tema')
  if (guardado === 'claro' || guardado === 'oscuro') return guardado
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro'
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'oscuro')
    localStorage.setItem('feria-tema', tema)
  }, [tema])

  const valor = {
    tema,
    alternar: () => setTema((actual) => (actual === 'claro' ? 'oscuro' : 'claro')),
    ponerClaro: () => setTema('claro'),
    ponerOscuro: () => setTema('oscuro'),
  }

  return <ThemeContext.Provider value={valor}>{children}</ThemeContext.Provider>
}