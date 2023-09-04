import { useParams } from 'react-router-dom';

import { MateriaUpdateForm } from '../../components/materia/MateriaUpdateForm';
import { MateriaNewForm } from '../../components/materia/MateriaNewForm';

export const MateriaFormPage = () => {
  const { id } = useParams();

  if (id !== 'new') {
    return <MateriaUpdateForm id={id!} />;
  }

  return <MateriaNewForm />;
};
