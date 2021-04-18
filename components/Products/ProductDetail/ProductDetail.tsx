import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { useMediaQuery } from 'react-responsive';

import { ProductLocal } from "../../../context/ShoppingCart";
import Counter from "../../Counter/Counter";
import currencyConverter from "../../../utils/currencyConverter"
import useCurrency from "../../../selectors/currencySelector"
type Props = {
  addToCart: (product: ProductLocal) => void;
  id: number;
  price: number;
  image: string;
  title: string;
  description: string;
  currency: string;
};

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    width: "100%",
  },
  spreadBox: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageClass: {
    height: "75%",
    width: "75%"
  }
}));

const ProductDetail = ({
  addToCart,
  id,
  price,
  image,
  title,
  description,
  currency,
}: Props) => {
  const [quantity, updateQuantity] = useState<number>(1);
  const [isAdded, setAddState] = useState<boolean>(false);

  const addButtonClicked = (
    imageLocal: string,
    titleLocal: string,
    priceLocal: number,
    idLocal: number,
    quantityLocal: number,
    descriptionLocal: string,
    currencyLocal: string
  ) => {
    const selectedProduct = {
      image: imageLocal,
      title: titleLocal,
      price: priceLocal,
      id: idLocal,
      quantity: quantityLocal,
      description: descriptionLocal,
      currency: currencyLocal,
    };
    addToCart(selectedProduct);
    setAddState(true);
  };
  const classes = useStyles()
  const { rates } = useCurrency()
  const { convertedPrice } = currencyConverter(price, currency, rates);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  return (
    <Box width="100%">
      <Paper variant="outlined" className={isMobile ? `` : `${classes.spreadBox} ${classes.box}`}>
        <Box m={2} className={`${classes.spreadBox} ${classes.box}`}>
          <img src={image} className={classes.imageClass} />
        </Box>
        <Box m={6}>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            {title} {isMobile}
          </Typography>
          &nbsp;
          <Typography>{description}</Typography>
          &nbsp;
          <Typography>
            {currency} {' '}
            {convertedPrice.toLocaleString(undefined, {maximumFractionDigits: 2})}
          </Typography>
        </Box>
      </Paper>
      <Box m={2} className={`${classes.spreadBox} ${classes.box}`}>
        <Counter productQuantity={quantity} updateQuantity={updateQuantity} />
      </Box>
      <Box className={`${classes.spreadBox} ${classes.box}`}>
        <Button
          onClick={() =>
            addButtonClicked(
              image,
              title,
              price,
              id,
              quantity,
              description,
              currency
            )
          }
          size="small"
          color="primary"
        >
          {!isAdded ? "ADD TO CART" : "✔ ADDED"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
