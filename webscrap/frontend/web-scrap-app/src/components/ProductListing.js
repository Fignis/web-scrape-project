import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
   
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
const ProductListing = ({listings})=> {
  
  const classes = useStyles();
if(listings){
  const mappedListings = listings.map((ele)=>{
    return {
  title:ele.title,
price:ele.price,
shippingInfo:ele.shippingInfo
   } 
  })
  return (
  <Card>
  <CardContent>
    <Typography className={classes.title} color="textSecondary" gutterBottom>
    {mappedListings}
    </Typography>
    <Typography variant="h5" component="h2">
     
    </Typography>
    
  </CardContent>
  <CardActions>
    <Button size="small">Learn More</Button>
  </CardActions>
</Card>)
  }else {
    return<div>Need to search</div>
  }
}
export default ProductListing;