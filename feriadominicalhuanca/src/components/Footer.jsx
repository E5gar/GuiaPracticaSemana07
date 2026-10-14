import { MapPin, Compass, GraduationCap } from 'lucide-react';

const enlaces = [
  { href: '#avenida', texto: 'Avenida' },
  { href: '#puestos', texto: 'Puestos' },
  { href: '#buscador', texto: 'Buscador' },
  { href: '#mesa', texto: 'Mesa de control' },
];

function Footer() {
  return (
    <footer className="bg-[#141414] text-[#faf9f8]">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <p className="font-serif text-6xl leading-none md:text-9xl">
          Nos vemos <em>el domingo</em>
        </p>

        <div className="mt-16 grid gap-10 border-t border-white/20 pt-10 text-sm md:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/70">
              <MapPin size={14} />
              Dónde
            </p>
            <p className="mt-3 text-base">Av. Huancavelica, Huancayo, Junín</p>
            <p className="mt-1 text-white/70">Cinco cuadras en paralelo a la Calle Real</p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/70">
              <Compass size={14} />
              Recorrido
            </p>
            <ul className="mt-3 space-y-1.5">
              {enlaces.map((enlace) => (
                <li key={enlace.href}>
                  <a href={enlace.href} className="text-base underline-offset-4 hover:underline">
                    {enlace.texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/70">
              <GraduationCap size={14} />
              Universidad Nacional del Centro del Perú
            </p>
            <p className="mt-3 text-base">Facultad de Ingeniería de Sistemas</p>
            <p className="mt-3 text-base">Asignatura Desarrollo de Aplicaciones Web</p>
            <p className="mt-1 text-white/70">Gago Uribe Edgar Robert</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
