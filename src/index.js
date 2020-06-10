// import 'react-app-polyfill/ie11';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// //import * as serviceWorker from './serviceWorker';
// import { HashRouter } from 'react-router-dom'
// import ScrollToTop from './ScrollToTop';

// ReactDOM.render(
//     <HashRouter>
//         <ScrollToTop>
//             <App></App>
//         </ScrollToTop>
//     </HashRouter>,
//     document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();






import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './AppWrapper';
import { HashRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import 'babel-polyfill';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'font-awesome/css/font-awesome.css';
import 'primereact/resources/primereact.min.css';// eslint-disable-next-line
import registerServiceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store ,persistor} from './store/index';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}> 
    <HashRouter>
		<AppWrapper />
     </HashRouter> 
     </PersistGate> 
        </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();