import React from 'react';
import Home from './client/pages/home';
import { ContextWrapper } from './Context';
import './App.css';

export const App = () => {
  return (
    <ContextWrapper>
      <Home />
    </ContextWrapper>
  );
};

export default App;
