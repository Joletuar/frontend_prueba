import { useEffect, useState } from 'react';

import { apiGraphQL } from '../../lib/api/apiGraphQL';
import { DataResponse, Profesor } from '../../lib/interfaces/Interfaces';

const graphqlQuery = `{
    profesores {
      id
      nombre
      correo
    }
  }`;

export const useProfesores = () => {
  const [dataList, setDataList] = useState<Profesor[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function sendGraphQLRequest() {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await apiGraphQL.post<DataResponse<Profesor>>('/', {
          query: graphqlQuery,
        });

        setDataList(data.data.profesores);
      } catch (error) {
        setError('Error al cargar la información');
        console.error('Error al realizar la solicitud GraphQL:', error);
      } finally {
        setIsLoading(false);
      }
    }

    sendGraphQLRequest();
  }, []);

  const updateList = (id: string) => {
    setDataList((prev) => prev!.filter((item) => item.id !== id));
  };

  return {
    dataList,
    isLoading,
    error,
    updateList,
  };
};
