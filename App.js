import React from 'react';
import {StatusBar, View} from 'react-native';
import Router from './src/router';
import {ArabianSuperStarProvider} from './src/context/ArabianSuperStarContext';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <ArabianSuperStarProvider>
        <Router />
      </ArabianSuperStarProvider>
    </PaperProvider>
  );
};

export default App;
