import { type FC } from 'react';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const TableList: FC<Props> = ({ title, children }) => {
  return (
    <div className='p-3'>
      <div className='row gap-4'>
        <h2 className='Titles text-center'>{title}</h2>
        <table className='table'>{children}</table>
      </div>
    </div>
  );
};
