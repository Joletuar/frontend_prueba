import { useEffect, useState } from 'react';

import { apiGraphQL } from '../../lib/api/apiGraphQL';
import { DataResponse, Aula } from '../../lib/interfaces/Interfaces';

const graphqlQuery = `{
    aulas {
      id
      fecha
      hora
      tema
      profesor {
        nombre
      }
      materia {
        nombre
      }
    }
  }`;

export const useAulas = () => {
  const [dataList, setDataList] = useState<Aula[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function sendGraphQLRequest() {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await apiGraphQL.post<DataResponse<Aula>>('/', {
          query: graphqlQuery,
        });

        setDataList(data.data.aulas);
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
