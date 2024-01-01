// Example usage in your component
import React from 'react';
import { useStateValue } from '../../StateProvider';
import axios from 'axios';

const LogoutButton = () => {
    const { state, dispatch } = useStateValue();
  const handleLogout = async () => {
    try {
        await axios.post('http://localhost:8080/auth/logout',null, {
          withCredentials: true, 
          credentials: 'include',
        });

        dispatch({
            type: 'LOGOUT'
        })

      } catch (error) {
        console.error('Error logging out:', error);
      }
  };

  return (
    <button className='h-9 w-36 rounded-md bg-black text-sm font-medium text-white' onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
