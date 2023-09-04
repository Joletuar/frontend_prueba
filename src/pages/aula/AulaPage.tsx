import { Link } from 'react-router-dom';

import { TableHeader } from '../../components/TableHeader';
import { TableList } from '../../components/TableList';
import { Loading } from '../../components/shared/Loading';
import { Error } from '../../components/shared/Error';
import { AddIcon, DeleteIcon, EditIcon } from '../../components/icons/Icons';

import { useAulas } from '../../hooks/aula/useAulas';
import { AULA_TABLE_HEADERS } from '../../lib/constants/tableHeaders';
import { apiGraphQL } from '../../lib/api/apiGraphQL';
import { toast } from 'sonner';

export const AulaPage = () => {
  const { dataList, isLoading, error, updateList } = useAulas();

  const handleDelete = async (id: string) => {
    const option = confirm('¿Estás seguro de que deseas eliminar?');

    if (!option) return;

    const mutation = `mutation {
        aulaDelete(id: "${id}") {
          ok
        }
      }`;

    try {
      await apiGraphQL.post('/', {
        query: mutation,
      });

      updateList(id);
      toast.success('Eliminación exitosa');
    } catch (error) {
      console.error(error);
      toast.error('Ha ocurrido un error, intenta de nuevo');
    }
  };

  if (isLoading && !error) {
    return <Loading />;
  }

  if (!isLoading && error) {
    return <Error error={error} />;
  }

  return (
    <div className='mx-auto mt-5'>
      <Link to='/aula/new' className='btn btn-primary'>
        <div className='me-1 d-inline'>
          <AddIcon />
        </div>
        Añadir
      </Link>
      {dataList && (
        <TableList title='Aulas'>
          <TableHeader headers={AULA_TABLE_HEADERS} />
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index} className='align-middle'>
                <th scope='row'>{item.id}</th>
                <td>{item.fecha}</td>
                <td>{item.hora}</td>
                <td>{item.tema}</td>
                <td>{item.profesor.nombre}</td>
                <td>{item.materia.nombre}</td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <Link to={`/aula/${item.id}`} className='btn btn-success'>
                      <EditIcon />
                      Editar
                    </Link>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </TableList>
      )}
    </div>
  );
};
