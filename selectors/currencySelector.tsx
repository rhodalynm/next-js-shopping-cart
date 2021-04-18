import { useSelector } from "react-redux";
import { RootState } from "../store";

const useCurrency = () => {
  return useSelector((state: RootState) => {
    const currency = state.currency;
    const rates = state.rates;
    return { currency, rates };
  });
};

export default useCurrency;
