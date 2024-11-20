import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppContent from './component/AppContent';
import './App.css';

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
