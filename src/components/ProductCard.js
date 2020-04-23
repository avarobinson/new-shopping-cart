import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    justifyContent: "center",
  },
  media: {
    height: 300,
    width: "auto",
  },
});

const handleCart = ({cartState, visibleCartState, cartTotalState, product}, size) => {
  let currentCartItems = cartState.cartItems
  currentCartItems.push({sku: product.sku, size: size})
  cartState.setCartItems(currentCartItems)
  visibleCartState.setVisibleCart(true)
  let updatedPrice = cartTotalState.cartTotal
  updatedPrice = updatedPrice + product.price
  cartTotalState.setCartTotal(updatedPrice)
};

const ProductCard = ({product, product_id, cartState, visibleCartState, cartTotalState}) =>{
    const classes = useStyles();
    const img_src = "data/products/" + product_id + "_1.jpg"

    return (
    <Card className={classes.root}>
        <CardActionArea>
        <CardMedia 
            component="img"
            className={classes.media}
            src={img_src}
            title={product.title}
        />
        <CardContent>
            <Typography gutterBottom variant="h10" component="h2">
                {product.title}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
                {product.currencyFormat} {product.price}
            </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary"
            onClick = { () => handleCart({cartState, visibleCartState, cartTotalState, product}, 'S')}
          >
            S
          </Button>
          <Button size="small" color="primary"
            onClick = { () => handleCart({cartState, visibleCartState, cartTotalState, product}, 'M')}
          >
            M
          </Button>
          <Button size="small" color="primary"
            onClick = { () => handleCart({cartState, visibleCartState, cartTotalState, product}, 'L')}>
            L
          </Button>
          <Button size="small" color="primary"
            onClick = { () => handleCart({cartState, visibleCartState, cartTotalState, product}, 'M')}
          >
            XL
          </Button>
      </CardActions>
        </CardActionArea>
    </Card>
    )
};

export default ProductCard;