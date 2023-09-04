import { Navigate, createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { ProfesorPage } from '../pages/profesor/ProfesorPage';
import { MateriaPage } from '../pages/materia/MateriaPage';
import { AulaPage } from '../pages/aula/AulaPage';
import { ProfesorFormPage } from '../pages/profesor/ProfesorFormPage';
import { MateriaFormPage } from '../pages/materia/MateriaFormPage';
import { AulaFormPage } from '../pages/aula/AulaFormPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'profesor/',
        element: <ProfesorPage />,
      },
      {
        path: 'profesor/:id',
        element: <ProfesorFormPage />,
      },
      {
        path: 'materia/',
        element: <MateriaPage />,
      },
      {
        path: 'materia/:id',
        element: <MateriaFormPage />,
      },
      {
        path: 'aula/',
        element: <AulaPage />,
      },
      {
        path: 'aula/:id',
        element: <AulaFormPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);
