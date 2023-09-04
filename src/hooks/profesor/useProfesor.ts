import { useEffect, useState } from 'react';

import { apiGraphQL } from '../../lib/api/apiGraphQL';
import { Profesor } from '../../lib/interfaces/Interfaces';

const graphqlQuery = (id: string) =>
  `{
    profesor (id:${id}){
      id
      nombre
      correo
    }
  }`;

export const useProfesor = (id: string) => {
  const [dataQuery, setDataQuery] = useState<Profesor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function sendGraphQLRequest() {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await apiGraphQL.post<{
          data: { profesor: Profesor };
        }>('/', {
          query: graphqlQuery(id),
        });

        setDataQuery(data.data.profesor);
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
