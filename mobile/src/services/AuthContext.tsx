// AuthContext.tsx
import React from 'react';

export const AuthContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: (value: boolean) => {},
  });
  