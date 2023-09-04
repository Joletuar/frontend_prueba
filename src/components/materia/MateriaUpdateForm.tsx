import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { apiGraphQL } from '../../lib/api/apiGraphQL';
import { useMateria } from '../../hooks/materia/useMateria';

import { Error } from '../shared/Error';
import { Loading } from '../shared/Loading';
import { toast } from 'sonner';

interface FormData {
  nombre: string;
  descripcion: string;
}

export const MateriaUpdateForm = ({ id }: { id: string }) => {
  const [isFetching, setIsFetching] = useState(false);

  const { register, formState, handleSubmit, setValue } = useForm<FormData>();
  const navigate = useNavigate();

  const { dataQuery, isLoading, error } = useMateria(id!);

  useEffect(() => {
    if (dataQuery) {
      setValue('nombre', dataQuery.nombre);
      setValue('descripcion', dataQuery.descripcion);
    }
  }, [dataQuery]);

  const handleSubmitForm = async (data: FormData) => {
    setIsFetching(true);

    const mutation = `
    mutation {
      materiaUpdate(id: "${id}", nombre: "${data.nombre}", descripcion: "${data.descripcion}") {
        materia {
          id
        }
      }
    }`;

    try {
      await apiGraphQL.post('/', {
        query: mutation,
      });
      toast.success('Actualización exitosa');
      navigate('/materia');
    } catch (error) {
      console.error(error);
      toast.error('Ha ocurrido un error, intenta de nuevo');
    } finally {
      setIsFetching(false);
    }
  };

  if (isLoading && !error) {
    return <Loading />;
  }

  if (!isLoading && error) {
    return <Error error={error} />;
  }

  return (
    <div className='w-75'>
      <div className='row justify-content-center align-content-center h-100'>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className=' border border-secondary rounded-3 col-6 p-5'
        >
          {/* Nombre */}
          <div className='mb-3'>
            <label htmlFor='nombre' className='form-label'>
              Nombre
            </label>
            <input
              type='text'
              className='form-control'
              {...register('nombre', {
                required: { value: true, message: 'El nombre es obligatorio' },
              })}
            />
            {formState.errors.nombre && (
              <span
                style={{ marginTop: '-2px', fontSize: '12px', color: 'red' }}
              >
                {formState.errors.nombre?.message}
              </span>
            )}
          </div>

          {/* Descripcion  */}
          <div className='mb-3'>
            <label htmlFor='descripcion' className='form-label'>
              Descripcion
            </label>
            <textarea
              rows={5}
              className='form-control'
              {...register('descripcion', {
                required: { value: true, message: 'Ingrese una descripción' },
              })}
            ></textarea>

            {formState.errors.nombre && (
              <span
                style={{ marginTop: '-2px', fontSize: '12px', color: 'red' }}
              >
                {formState.errors.nombre?.message}
              </span>
            )}
          </div>

          <button
            type='submit'
            className='btn btn-primary'
            disabled={isFetching}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
