import { useState } from 'react';

export const useUser = () => {
  const [name, setName] = useState('');

  return { name, setName };
};
