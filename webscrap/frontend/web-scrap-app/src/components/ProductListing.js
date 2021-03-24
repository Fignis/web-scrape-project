import React,{useState} from 'react';
import {CardMedia, makeStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import {Grid} from '@material-ui/core';
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
    media:{
      height:140
    }
  });
const ProductListing = (props)=> {
  
  const classes = useStyles();
if(props.listings){
  const mappedListings = props.listings.map((ele)=>{
    return (
      <Grid item xs={8} sm={4}>
      <Card key={ele.id}>
        <CardMedia component="img" className={classes.media}src={ele.imgLink}>

        </CardMedia>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {ele.title}
        </Typography>

        <Typography variant="h5" component="h2">
         
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Grid>
    )
   
  })
  return <Grid  spacing={3} container direction="row">{mappedListings}</Grid>;
  
}else{
return (<Card>
  <CardContent>
    <Typography>
      Please search for something...
    </Typography>
  </CardContent>
</Card>)
} }
export default ProductListing;