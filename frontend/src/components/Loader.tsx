import React from 'react';
import { Spinner } from 'react-bootstrap';

interface ILoaderProps {}

const Loader: React.FC<ILoaderProps> = () => {
  return (
    <div className='d-flex justify-content-center mb-5'>
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
