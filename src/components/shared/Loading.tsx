export const Loading = () => {
  return (
    <span className='container p-3 d-flex justify-content-center align-items-center fw-bold gap-3'>
      Cargando...
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </span>
  );
};
