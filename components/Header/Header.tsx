import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import StoreIcon from "@material-ui/icons/Store";
import Typography from "@material-ui/core/Typography";
import { makeStyles , withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { Rates } from "../../store";
import Currency from "../Currency/Currency";
import ShoppingCartPop from "./ShoppingCartPop";
import useCart from "../../selectors/cartSelector"

type Props = {
  rates: Rates;
};

const StyledAppBar = withStyles((theme) => ({
  root: {
    backgroundColor: "black",
    "&.MuiAppBar-positionSticky": {
      "& .MuiToolbar-root": {
        color: "green",
        "& .MuiButtonBase-root": {
          fontSize: 24
        }
      }
    }
  }
}))(AppBar);

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background : "#000000"
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    textColor: 'white'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = ({ rates }: Props) => {
  const classes = useStyles();
  const {cart, totalItems} = useCart()

  return (
    <React.Fragment>
      <CssBaseline />
      <StyledAppBar
        position="static"
        elevation={1}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit"  href="/">
            <StoreIcon className={classes.icon}/>
          </IconButton>
         
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Online Store
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Currency rates={rates} />
          
          <ShoppingCartPop cart={cart} totalItems={totalItems} />
        </Toolbar>
      </StyledAppBar>
    </React.Fragment>
  );
};

export default Header;
