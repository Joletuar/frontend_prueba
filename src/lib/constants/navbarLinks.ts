export const NAVBAR_LINKS: NavbarLink[] = [
  {
    title: 'Inicio',
    to: '/',
  },
  {
    title: 'Profesores',
    to: '/profesor',
  },
  {
    title: 'Materias',
    to: '/materia',
  },
  {
    title: 'Aulas',
    to: '/aula',
  },
];

interface NavbarLink {
  title: string;
  to: string;
}
