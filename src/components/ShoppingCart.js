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

const ShoppingCart = ({products, product, cartState}) =>{
    const classes = useStyles();
    const img_src = "data/products/" + product.sku + "_1.jpg"

    let product_info = products.filter(p => p.sku === product.sku);
    product_info = product_info[0];
    
    return (
    <Card className={classes.root}>
        <CardActionArea>
        <CardMedia 
            component="img"
            className={classes.media}
            src={img_src}
            title={product_info.title}
        />
        <CardContent>
            <Typography gutterBottom variant="h10" component="h2">
                {product_info.title}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
                {product_info.currencyFormat} {product_info.price}
            </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" color="primary">
            Remove
          </Button>
      </CardActions>
        </CardActionArea>
    </Card>
    )
};

export default ShoppingCart;