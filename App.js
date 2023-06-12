import React from 'react';
import AuthNavigation from './AuthNavigation';
import GlobalContextProvider from './context/GlobalContextProvider';

export default function App() {
  return (
    <GlobalContextProvider>
      <AuthNavigation />
    </GlobalContextProvider>
  )
}
