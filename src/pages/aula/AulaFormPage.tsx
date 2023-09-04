import { useParams } from 'react-router-dom';

import { AulaUpdateForm } from '../../components/aula/AulaUpdateForm';
import { AulaNewForm } from '../../components/aula/AulaNewForm';

export const AulaFormPage = () => {
  const { id } = useParams();

  if (id !== 'new') {
    return <AulaUpdateForm id={id!} />;
  }

  return <AulaNewForm />;
};
