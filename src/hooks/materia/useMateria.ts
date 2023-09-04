import { useEffect, useState } from 'react';

import { apiGraphQL } from '../../lib/api/apiGraphQL';
import { Materia } from '../../lib/interfaces/Interfaces';

const graphqlQuery = (id: string) =>
  `{
    materia (id:${id}){
      id
      nombre
      descripcion
    }
  }`;

export const useMateria = (id: string) => {
  const [dataQuery, setDataQuery] = useState<Materia | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function sendGraphQLRequest() {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await apiGraphQL.post<{
          data: { materia: Materia };
        }>('/', {
          query: graphqlQuery(id),
        });

        setDataQuery(data.data.materia);
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
