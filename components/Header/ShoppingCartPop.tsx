import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import StyledBadge from "./StyledBadge";

import useCurrency from "../../selectors/currencySelector";
import currencyConverter from "../../utils/currencyConverter";
import EmptyCart from "./EmptyCart";
import { useDispatch } from "react-redux";
import { ProductLocal } from "../../store";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  },
  inline: {
    display: "inline",
  },
  box: {
    display: "flex",
    width: "100%",
  },
  spreadBox: {
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

type Props = {
  cart: ProductLocal[];
  totalItems: number;
};

const onRemoveToCart = (productID, cart) => {
  const dispatch = useDispatch();

  const removeProduct = () =>
    dispatch({
      type: "REMOVE_PRODUCT",
      cart: cart,
      payload: productID,
    });

  return { removeProduct };
};

const generate = (element) => {
  return [0].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
};

export default function ShoppingCartPop({ cart, totalItems }: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dense] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { currency, rates } = useCurrency();

  const cartItems = cart.map((product: ProductLocal) => {
    const { convertedPrice } = currencyConverter(
      product.price,
      currency,
      rates
    );
    const totalAmount = product.quantity * convertedPrice;
    const { removeProduct } = onRemoveToCart(product.id, cart);
    return (
      <List dense={dense}>
        {generate(
          <ListItem>
            <ListItemAvatar>
              <Avatar src={product.image}>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={product.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {currency}{" "}
                    {totalAmount.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                  {" —"}
                  {product.quantity} {"qty ( "}
                  {currency}{" "}
                  {convertedPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{" "}
                  {")"}
                </React.Fragment>
              }
            />

            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon onClick={removeProduct} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    );
  });

  if (cartItems.length > 0) {
    return (
      <div>
        <IconButton color="inherit" aria-label="show cart" component="span">
          <StyledBadge
            color="secondary"
            onClick={handleClick}
            badgeContent={totalItems ? totalItems : 0}
          >
            <ShoppingCartIcon color="inherit" />
          </StyledBadge>
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {cartItems}
          <Box m={2} className={`${classes.spreadBox} ${classes.box}`}>
            <Button variant="contained" color="default">
              PROCEED TO CHECKOUT
            </Button>
          </Box>
        </Popover>
      </div>
    );
  } else {
    return <EmptyCart />;
  }
}
