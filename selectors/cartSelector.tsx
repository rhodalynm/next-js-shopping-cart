import { useSelector } from "react-redux";
import { RootState } from "../store";

const useCart = () => {
  return useSelector((state: RootState) => {
    const cart = state.cart;
    const totalAmount = state.totalAmount;
    const totalItems = state.totalItems;
    return { cart, totalAmount ,totalItems};
  });
};

export default useCart;