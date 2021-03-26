import React,{useState} from 'react';
import {Box, CardActionArea, CardMedia, Grow, makeStyles} from '@material-ui/core';
import {useTheme} from'@material-ui/styles';
import Card from '@material-ui/core/Card';
import {Grid} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme=>({
   
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 13,
    },
    pos: {
      marginBottom: 12,
    },
    media:{
      height:240,
    },
    card:{
      backgroundColor:'transparent',
      color:theme.palette.common.dark,
      height:'10vh'
    },
    layout:{
      marginTop:15
    }
  }));
 
const ProductListing = (props)=> {
  
  const classes = useStyles();

  const listingsArray= [];
  
  const mappedListings = props.listings.map((ele)=>{
    return (  
      <Grid   component={Card} item xs={8} sm={4}>
        <Grow in>
      <Card key={ele.id}>
      <CardActionArea>
        <CardMedia component="img" className={classes.media}src={ele.imgLink}>

        </CardMedia>
      
      <CardContent className={classes.card}>
        <Typography component='p' className={classes.title} variant="h6"color="textSecondary">
        {ele.title}
        </Typography>

        <Typography color="textPrimary"align="left"variant="h5" component="h2">
         {ele.price}
        </Typography>
        <Typography color="textSecondary" variant="p" component="p">
        {ele.shippingInfo}
        </Typography>
      </CardContent>
    

    </CardActionArea>
    </Card>
    </Grow>
    </Grid>
    )
   
  })
  console.log({mappedListings});
  return <Box mt={5}><Grid  spacing={3} container direction="row">{mappedListings}</Grid> </Box>;
  
 }
export default ProductListing;