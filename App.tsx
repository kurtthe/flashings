import React from 'react';
import { Application } from './src';
import { persistor, store } from '@store';

const App = () => <Application store={store} persistor={persistor} />;

export default App;
