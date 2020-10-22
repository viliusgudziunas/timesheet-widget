import React from 'react';
import { Link } from 'react-router-dom';

const Bottom = () => {
  return (
    <div className='bottom'>
      <Link to='/add-todo' className='link'>
        <button type='submit' className='button orange-background'>
          ADD TASK
        </button>
      </Link>
    </div>
  );
};

export default Bottom;
