export const Error = ({ error }: { error: string }) => {
  return (
    <span className='container p-3 d-flex justify-content-center align-items-center fw-bold'>
      {error}
    </span>
  );
};
