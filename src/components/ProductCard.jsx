import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ClientContext } from '../contexts/ClientProvider';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function ProductCard({item}) {
  const {addAndDeleteProductInCart, checkProductInCart} = React.useContext(ClientContext)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={item.image}
        alt={item.name}
        className='product-card-image'
      />
      <CardContent>
        <Typography 
        className='product-card-title' 
        gutterBottom variant="h5" 
        component="div">
          {item.name}
        </Typography>
        <Typography 
        className='product-card-title' 
        gutterBottom variant="body2" 
        component="div">
          <strong>{item.brand}</strong>
        </Typography>
        <Typography variant="body2" >
          Цена: <strong>{item.price} сом</strong>
          <Stack spacing={1}>
          <Rating name="size-medium" defaultValue={2} />
        </Stack>
        </Typography>
      </CardContent>
      <CardActions>
        {checkProductInCart(item.id) ? (
            <Button color ='error' onClick={()=> addAndDeleteProductInCart(item)} size="small">Убрать из избранного</Button>
        ) : (
          <Button onClick={()=> addAndDeleteProductInCart(item)} size="small">Добавить в избранное</Button>
        )}
        <Link to={`/product/${item.id}`}>
           <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
