import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator'; 

import { AuthContext } from './src/services/AuthContext';
const App: React.FC = () => {

 const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
