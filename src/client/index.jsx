/**
 * Client-side rendering of the App.
 */

import cookies from 'browser-cookies';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  configureConnector,
  decodeToken,
  getFreshToken,
} from 'tc-accounts';

import config from '../shared/config';
import App from '../shared';
import storeFactory from '../shared/store-factory';

configureConnector({
  connectorUrl: config.ACCOUNTS_APP_CONNECTOR_URL,
  frameId: 'tc-accounts-iframe',
});

getFreshToken().then((token) => {
  cookies.set('tct', token, {
    expires: config.COOKIES.MAXAGE,
    secure: config.COOKIES.SECURE,
  });
  /* TODO: Dispatch an action to store the token and user object to the store,
   * in case it is not already stored there by server. */
});

storeFactory(undefined, window.ISTATE).then(store =>
  render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('react-view')));
