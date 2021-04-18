import React, { createContext, useReducer, useEffect } from "react";
import CartReducer from "./CartReducer";

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

export interface Init {
  cart: ProductLocal[];
  totalItems: number;
  totalAmount: number;
  removeProduct?: (id: number) => void;
  addProduct?: (selectedProducts: ProductLocal) => void;
}

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
};

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // catch possible errors:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
};

const getLocalStorage = (key, initialValue) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
};

const initState = getLocalStorage("cart", initialState) || initialState;

export const CartContext = createContext<Init>(initState);
export const CartProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(CartReducer, initState);

  const removeProduct = (id: number) => {
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: id,
    });
  };

  const addProduct = (selectedProducts: Product) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: selectedProducts,
    });
  };

  useEffect(() => {
    setLocalStorage("cart", state);
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
        removeProduct,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
