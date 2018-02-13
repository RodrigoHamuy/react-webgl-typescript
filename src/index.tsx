import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import Canvas from './components/Canvas';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Canvas />,
  document.getElementById('root') // as HTMLElement
);
registerServiceWorker();
