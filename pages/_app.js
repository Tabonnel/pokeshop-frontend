import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { configureStore, combineReducers, miniSerializeError } from '@reduxjs/toolkit';
import user from '../reducers/user';
import cart from '../reducers/cart';


import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';


const reducers = combineReducers({
  user: user,
  cart: cart,
});
const persistConfig = {
  key: 'root',
  storage,
};
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

      <Head>
        <title>Poke Shop</title>
      </Head>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
