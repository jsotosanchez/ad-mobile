import 'react-native-gesture-handler';
import React from 'react';
import ApplicationContext from './src/contextComponents/ApplicationContext';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <ApplicationContext>
      <Navigation />
    </ApplicationContext>
  );
}
