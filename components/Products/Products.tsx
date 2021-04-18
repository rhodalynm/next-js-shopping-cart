import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductItem from './ProductItem/ProductItem';
import useCurrency from '../../selectors/currencySelector';
import { makeStyles } from '@material-ui/core/styles';
import { CartContext, Init, ProductWeb } from '../../context/ShoppingCart';

type Props = {
  productsList: ProductWeb[];
};

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const Products = ({ productsList }: Props) => {
  const { currency } = useCurrency();
  const { addProduct } = useContext<Init>(CartContext);
  const classes = useStyles();
  
  const productsData = productsList
    .map((product) => (
      <ProductItem
        price={product.price}
        title={product.title}
        description={product.description}
        image={product.image}
        id={parseInt(product.id, 10)}
        addToCart={addProduct}
        currency={currency}
      />
    ));

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {productsData}
      </Grid>
    </Container>
  );
};

export default Products;
