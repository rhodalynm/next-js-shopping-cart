import React, { useState, useEffect } from "react";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import { ProductLocal } from "../../../context/ShoppingCart";
import Counter from "../../Counter/Counter";
import currencyConverter from "../../../utils/currencyConverter"
import useCurrency from "../../../selectors/currencySelector";


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
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  cardMedia: {
    paddingTop: "100%", // 16:9
    height: "100%",
    width: "75%",
  },
  cardContent: {
    flexGrow: 1,
  },
  box: {
    display: "flex",
    width: "100%",
  },
  spreadBox: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  root: {
    backgroundSize: "contain"
  }
}));

const ProductItem = ({
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
  const {convertedPrice} = currencyConverter(price, currency, rates)
  return (
    <Grid item key={id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia classes={{
            root: classes.root
          }}  className={classes.cardMedia} image={image} title={title} />
        <CardActionArea>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom component="h4">
              {title.substr(0, 25)}
            </Typography>
            <Typography>
              {currency}{' '}
              {convertedPrice.toLocaleString(undefined,{maximumFractionDigits: 2})}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Typography align="center">
          <Counter productQuantity={quantity} updateQuantity={updateQuantity} />
        </Typography>
        <CardActions>
          <Box className={`${classes.spreadBox} ${classes.box}`}>
            <Button size="small" color="primary">
              <Link href={{ pathname: "../product-details", query: { id } }}>
                View
              </Link>
            </Button>

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
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
