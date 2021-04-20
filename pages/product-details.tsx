import { GetServerSideProps } from "next";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header/Header";
import ProductDetail from "../components/Products/ProductDetail/ProductDetail";
import Footer from "../components/Footer/Footer";
import useCurrency from "../selectors/currencySelector";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://fakestoreapi.com/products/${context.query.id}`
  );
  const product = await res.json();
  return {
    props: {
      product,
    },
  };
};

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    width: "100%",
  },
  spreadBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));

const ProductDetails = ({ product }) => {
  const { currency, rates } = useCurrency();
  const productPrice = product.price;
  const classes = useStyles();
  return (
    <Container>
      <Header rates={rates} />
      <Box m={2}>
        <ProductDetail
          price={productPrice}
          title={product.title}
          description={product.description}
          image={product.image}
          id={parseInt(product.id, 10)}
          currency={currency}
        />
      </Box>
      <Box className={`${classes.spreadBox} ${classes.box}`}>
        <Button variant="contained" color="default" href="/">
          Back
        </Button>
      </Box>
      <Footer />
    </Container>
  );
};

export default ProductDetails;
