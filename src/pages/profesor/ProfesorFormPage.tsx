import { useParams } from 'react-router-dom';

import { ProfesorUpdateForm } from '../../components/profesor/ProfesorUpdateForm';
import { ProfesorNewForm } from '../../components/profesor/ProfesorNewForm';

export const ProfesorFormPage = () => {
  const { id } = useParams();

  if (id !== 'new') {
    return <ProfesorUpdateForm id={id!} />;
  }

  return <ProfesorNewForm />;
};
