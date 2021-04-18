import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Online Store
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Box>
        <Typography color="inherit" align="center" gutterBottom>
          Follow Us
          <IconButton>
            <FacebookIcon />
          </IconButton>
          <IconButton>
            <InstagramIcon />
          </IconButton>
          <IconButton>
            <TwitterIcon />
          </IconButton>
        </Typography>
      </Box>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        {Copyright}
      </Typography>
      <Copyright />
    </footer>
  );
};

export default Footer;
