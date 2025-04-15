'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  name: string;
  image: string;
}

const defaultUser: User = {
  id: '',
  name: '',
  image: ''
};

const UserContext = createContext<User>(defaultUser);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    // You can load this from localStorage, DB, or create it fresh
    const existingId = localStorage.getItem('guest-user-id');
    const userId = existingId || uuidv4();

    if (!existingId) {
      localStorage.setItem('guest-user-id', userId);
    }

    setUser({
      id: userId,
      name: 'Guest User',
      image: '/icons/default-user.svg'
    });
  }, []);

  if (!user.id) return null; // or <Loader />

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
