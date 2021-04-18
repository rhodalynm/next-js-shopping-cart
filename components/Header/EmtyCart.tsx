import { useState }  from "react";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles } from "@material-ui/core/styles";

import StyledBadge from "./StyledBadge";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    width: "100%",
  },
  spreadBox: {
    justifyContent: "space-around",
    alignItems: "center",
  },
}))

const EmtpyCart = () =>{
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? "simple-popover" : undefined;

    return (
    <div>
          <IconButton color="inherit" aria-label="show cart" component="span">
            <StyledBadge
              color="secondary"
              onClick={handleClick}
              badgeContent={0}
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
            <Box m={6}>
              <Box className={`${classes.spreadBox} ${classes.box}`}>
            <Typography>Your cart is empty</Typography>&nbsp;&nbsp;
            </Box>
            <Box className={`${classes.spreadBox} ${classes.box}`}>
            <AddShoppingCartIcon />
            </Box>
            </Box>
          </Popover>
        </div>
    )
}

export default EmtpyCart