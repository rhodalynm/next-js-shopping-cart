import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { CHANGE } from "./constants/constants";

const persistConfig = {
  key: "root",
  storage,
};

const initialState = {
  currency: "USD",
  rates: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        currency: action.currency,
        rates: action.rates,
      };

    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>

const persistedReducer = persistReducer(persistConfig, reducer);
let store = createStore(persistedReducer);
function initStore(preloadedState = initialState) {
  return createStore(
    persistReducer(persistConfig, reducer),
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  let persistor = persistStore(store);
  return { store, persistor };
};
