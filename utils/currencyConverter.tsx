import { GBP, JPY, EUR, USD } from "../constants/constants";
import { Rates } from "../context/ShoppingCart";

const currencyConverter = (price: number, currency: string, rates: Rates) => {
  let toRate = 1;
  switch (currency) {
    case GBP:
      toRate = rates.GBP;
      break;
    case JPY:
      toRate = rates.JPY;
      break;
    case EUR:
      toRate = rates.EUR;
      break;
    case USD:
    default:
      toRate = rates.USD;
      break;
  }

  const convertedPrice = rates
    ? (rates.EUR / rates.USD) * toRate * price
    : price;

  return { convertedPrice };
};

export default currencyConverter;
