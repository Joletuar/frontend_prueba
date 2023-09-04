import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { apiGraphQL } from '../../lib/api/apiGraphQL';
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

const defaultValues = {
  fecha: '',
  hora: '',
  tema: '',
  profesor: '',
  materia: '',
};

export const AulaNewForm = () => {
  const [isFetching, setIsFetching] = useState(false);

  const { register, formState, handleSubmit, control } = useForm<FormData>({
    defaultValues,
  });
  const navigate = useNavigate();

  const { dataList: dataListProfesores } = useProfesores();
  const { dataList: dataListMaterias } = useMaterias();

  const handleSubmitForm = async (data: FormData) => {
    setIsFetching(true);

    const mutation = `
      mutation {
        aulaCreate (fecha: "${data.fecha}", hora: "${data.hora}", tema: "${data.tema}", profesor: ${data.profesor}, materia: ${data.materia} ) {
          aula {
            id
          }
        }
      }`;

    try {
      await apiGraphQL.post('/', {
        query: mutation,
      });
      toast.success('Creación exitosa');
      navigate('/aula');
    } catch (error) {
      console.error(error);
      toast.error('Ha ocurrido un error, intenta de nuevo');
    } finally {
      setIsFetching(false);
    }
  };

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

            <Controller
              name='profesor'
              control={control}
              defaultValue=''
              rules={{
                validate: (value) => value !== '' || 'Selecciona un profesor',
              }}
              render={({ field }) => (
                <select {...field} className='form-select'>
                  <option value=''>-- Escoja un profesor --</option>
                  {dataListProfesores?.map((profesor) => (
                    <option value={profesor.id} key={profesor.id}>
                      {profesor.nombre}
                    </option>
                  ))}
                </select>
              )}
            />

            {formState.errors.profesor && (
              <span
                style={{ marginTop: '-2px', fontSize: '12px', color: 'red' }}
              >
                {formState.errors.profesor?.message}
              </span>
            )}
          </div>

          {/* Materia */}
          <div className='mb-3'>
            <label htmlFor='materia' className='form-label'>
              Materia
            </label>

            <Controller
              name='materia'
              control={control}
              defaultValue=''
              rules={{
                validate: (value) => value !== '' || 'Selecciona una materia',
              }}
              render={({ field }) => (
                <select {...field} className='form-select'>
                  <option value=''>-- Escoja una materia --</option>
                  {dataListMaterias?.map((materia) => (
                    <option value={materia.id} key={materia.id}>
                      {materia.nombre}
                    </option>
                  ))}
                </select>
              )}
            />

            {formState.errors.materia && (
              <span
                style={{ marginTop: '-2px', fontSize: '12px', color: 'red' }}
              >
                {formState.errors.materia?.message}
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
