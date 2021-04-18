import { useSelector } from "react-redux";

const useCurrency = () => {
  return useSelector((state) => {
    const currency = state.currency;
    const rates = state.rates;
    return { currency, rates };
  });
};

export default useCurrency;
