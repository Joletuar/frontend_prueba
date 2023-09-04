import { type FC } from 'react';

interface Props {
  headers: string[];
}
export const TableHeader: FC<Props> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th scope='col' key={crypto.randomUUID()}>
            {header.toUpperCase()}
          </th>
        ))}
      </tr>
    </thead>
  );
};
