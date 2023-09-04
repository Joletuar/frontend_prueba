import { useEffect, useState } from 'react';

import { apiGraphQL } from '../../lib/api/apiGraphQL';

const graphqlQuery = (id: string) =>
  `{
    aula (id:${id}){
      id
      fecha
      hora
      tema
      profesor {
        id
      }
      materia {
        id
      }
    }
  }`;

interface CustomAula {
  fecha: string;
  hora: string;
  tema: string;
  profesor: { id: string };
  materia: { id: string };
}

export const useAula = (id: string) => {
  const [dataQuery, setDataQuery] = useState<CustomAula | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function sendGraphQLRequest() {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await apiGraphQL.post<{
          data: { aula: CustomAula };
        }>('/', {
          query: graphqlQuery(id),
        });

        setDataQuery(data.data.aula);
      } catch (error) {
        setError('Error al cargar la información');
        console.error('Error al realizar la solicitud GraphQL:', error);
      } finally {
        setIsLoading(false);
      }
    }

    sendGraphQLRequest();
  }, []);

  return {
    dataQuery,
    isLoading,
    error,
  };
};
