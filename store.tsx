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

type Product = {
  price: number;
  image: string;
  title: string;
  quantity: number;
  description: string;
  currency: string;
};

export type Rates = {
  GBP: number;
  JPY: number;
  EUR: number;
  USD: number;
};

export type ProductWeb = Product & { id: string };

export type ProductLocal = Product & { id: number };



const initialState = {
  currency: "USD",
  rates: "",
  cart: [],
  totalItems: 0,
  totalAmount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        currency: action.currency,
        rates: action.rates,
      };
    
      case 'REMOVE_PRODUCT': {
        const newCart = state.cart.filter((x) => x.id !== action.payload);
        const newTotalItems = newCart.length;
        const newTotalAmount = newCart.reduce((acc, currentProduct) => acc + currentProduct.price * currentProduct.quantity, 0);
        return {
          ...state,
          cart: newCart,
          totalItems: newTotalItems,
          totalAmount: newTotalAmount,
        };
      }
      case 'ADD_PRODUCT': {
        const newCart = [...state.cart];
        const productID = action.payload.id;
        const productQty = action.payload.quantity;
        const isExist = newCart.findIndex((element) => element.id === productID);
        if (isExist !== -1) {
          newCart[isExist].quantity += productQty;
        } else {
          newCart.push(action.payload);
        }
        const newTotalItems = newCart.length;
        const newTotalAmount = newCart.reduce((acc, currentProduct) => acc + currentProduct.price * currentProduct.quantity, 0);
        return {
          ...state,
          cart: newCart,
          totalItems: newTotalItems,
          totalAmount: newTotalAmount,
        };
      }
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
