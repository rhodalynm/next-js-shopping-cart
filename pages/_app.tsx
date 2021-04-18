import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "../store";

import { CartProvider } from "../context/ShoppingCart";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const st = store.store;
  const { persistor } = store;

  return (
    <Provider store={st}>
      <PersistGate loading={null} persistor={persistor}>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </PersistGate>
    </Provider>
  );
}
