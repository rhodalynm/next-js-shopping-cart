import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSelector, useDispatch } from "react-redux";

import { CHANGE, currenciesList } from "../../constants/constants";
import { Rates } from "../../context/ShoppingCart";

type Props = {
  rates: Rates;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    background: "black",
  },
  whiteColor: {
    color: "white",
  },
}));

const onChangeCurrency = (rates) => {
  const currency = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  const changeCurrency = (e) =>
    dispatch({
      type: CHANGE,
      currency: e.target.value,
      rates,
    });

  return { currency, changeCurrency };
};

const Currency = ({ rates }: Props) => {
  const { currency, changeCurrency } = onChangeCurrency(rates);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={currency}
        onChange={changeCurrency}
        classes={{
          root: classes.whiteColor,
          icon: classes.whiteColor,
        }}
      >
        {currenciesList.map((value) => {
          if (currency == value) {
            return (
              <MenuItem key={value} value={value} selected>
                {value}
              </MenuItem>
            );
          }
          return (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Currency;
