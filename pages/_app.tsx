import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "../store";

const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const st = store.store;
  const { persistor } = store;

  return (
    <Provider store={st}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default App;
