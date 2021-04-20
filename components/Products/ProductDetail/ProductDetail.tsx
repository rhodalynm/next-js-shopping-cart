import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { useMediaQuery } from "react-responsive";

import Counter from "../../Counter/Counter";
import currencyConverter from "../../../utils/currencyConverter";
import useCurrency from "../../../selectors/currencySelector";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
type Props = {
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
    width: "75%",
  },
}));

const onAddToCart = (selectedProduct) => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const addButtonClicked = () =>
    dispatch({
      type: "ADD_PRODUCT",
      cart: cart,
      payload: selectedProduct,
      isAdded: true,
    });

  return { addButtonClicked };
};

const ProductDetail = ({
  id,
  price,
  image,
  title,
  description,
  currency,
}: Props) => {
  const [quantity, updateQuantity] = useState<number>(1);

  const selectedProduct = {
    image: image,
    title: title,
    price: price,
    id: id,
    quantity: quantity,
    description: description,
    currency: currency,
  };
  const { addButtonClicked } = onAddToCart(selectedProduct);
  const isAdded = false;
  const classes = useStyles();
  const { rates } = useCurrency();
  const { convertedPrice } = currencyConverter(price, currency, rates);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  return (
    <Box width="100%">
      <Paper
        variant="outlined"
        className={isMobile ? `` : `${classes.spreadBox} ${classes.box}`}
      >
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
            {currency}{" "}
            {convertedPrice.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      </Paper>
      <Box m={2} className={`${classes.spreadBox} ${classes.box}`}>
        <Counter productQuantity={quantity} updateQuantity={updateQuantity} />
      </Box>
      <Box className={`${classes.spreadBox} ${classes.box}`}>
        <Button onClick={addButtonClicked} size="small" color="primary">
          {!isAdded ? "ADD TO CART" : "✔ ADDED"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
