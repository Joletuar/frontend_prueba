import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { apiGraphQL } from '../../lib/api/apiGraphQL';
import { useAula } from '../../hooks/aula/useAula';

import { Error } from '../shared/Error';
import { Loading } from '../shared/Loading';
import { useProfesores } from '../../hooks/profesor/useProfesores';
import { useMaterias } from '../../hooks/materia/useMaterias';
import { toast } from 'sonner';

interface FormData {
  fecha: string;
  hora: string;
  tema: string;
  profesor: string;
  materia: string;
}

export const AulaUpdateForm = ({ id }: { id: string }) => {
  const [isFetching, setIsFetching] = useState(false);

  const { register, formState, handleSubmit, setValue } = useForm<FormData>();
  const navigate = useNavigate();

  const { dataQuery, isLoading, error } = useAula(id!);
  const { dataList: dataListProfesores } = useProfesores();
  const { dataList: dataListMaterias } = useMaterias();

  useEffect(() => {
    if (dataQuery) {
      const [H, m] = dataQuery.hora.split(':');

      setValue('fecha', dataQuery.fecha);
      setValue('hora', [H, m].join(':'));
      setValue('tema', dataQuery.tema);
      setValue('profesor', dataQuery.profesor.id);
      setValue('materia', dataQuery.materia.id);
    }
  }, [dataQuery]);

  const handleSubmitForm = async (data: FormData) => {
    setIsFetching(true);

    const mutation = `
    mutation {
      aulaUpdate(id: "${id}", fecha: "${data.fecha}", hora: "${data.hora}", tema: "${data.tema}", profesor: "${data.profesor}", materia: "${data.materia}") {
        aula {
          id
        }
      }
    }`;

    try {
      await apiGraphQL.post('/', {
        query: mutation,
      });
      toast.success('Actualización exitosa');
      navigate('/aula');
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
          {/* Tema */}
          <div className='mb-3'>
            <label htmlFor='tema' className='form-label'>
              Tema
            </label>
            <input
              type='text'
              className='form-control'
              {...register('tema', {
                required: { value: true, message: 'Ingrese un tema válido' },
              })}
            />
            {formState.errors.tema && (
              <span
                style={{ marginTop: '-2px', fontSize: '12px', color: 'red' }}
              >
                {formState.errors.tema?.message}
              </span>
            )}
          </div>

          {/* Fecha */}
          <div className='mb-3'>
            <label htmlFor='fecha' className='form-label'>
              Fecha
            </label>

            <input
              type='date'
              className='form-control'
              {...register('fecha', {
                required: { value: true, message: 'Escoja una fecha' },
              })}
            />
            {formState.errors.fecha && (
              <span
                style={{ marginTop: '-2px', fontSize: '12px', color: 'red' }}
              >
                {formState.errors.fecha?.message}
              </span>
            )}
          </div>

          {/* Hora */}
          <div className='mb-3'>
            <label htmlFor='hora' className='form-label'>
              Hora
            </label>

            <input
              type='time'
              className='form-control'
              {...register('hora', {
                required: { value: true, message: 'Escoja una hora válida' },
              })}
            />
            {formState.errors.hora && (
              <span
                style={{ marginTop: '-2px', fontSize: '12px', color: 'red' }}
              >
                {formState.errors.hora?.message}
              </span>
            )}
          </div>

          {/* Profesor  */}
          <div className='mb-3'>
            <label htmlFor='profesor' className='form-label'>
              Profesor
            </label>

            <select
              className='form-select'
              {...register('profesor')}
              defaultValue={
                dataListProfesores?.find(
                  (profesor) => profesor.id === dataQuery?.profesor.id
                )?.id
              }
            >
              {dataListProfesores?.map((profesor) => (
                <option key={profesor.id} value={profesor.id}>
                  {profesor.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Materia */}
          <div className='mb-3'>
            <label htmlFor='materia' className='form-label'>
              Materia
            </label>

            <select
              className='form-select'
              {...register('materia')}
              defaultValue={
                dataListMaterias?.find(
                  (materia) => materia.id === dataQuery?.materia.id
                )?.id
              }
            >
              {dataListMaterias?.map((materia) => (
                <option key={materia.id} value={materia.id}>
                  {materia.nombre}
                </option>
              ))}
            </select>
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
