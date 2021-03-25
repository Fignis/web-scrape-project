import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import React from 'react';

const useStyles = makeStyles(()=>({
TypographyStyles:{
flex:1
}})) 
const NavBar = ()=>{
    const classes =useStyles()
    return (
    <AppBar position="static" color="primary">
    <Toolbar>
     <Typography className={classes.TypographyStyles}>
        Price Scraper
     </Typography>
     <DonutLargeIcon/>
    </Toolbar>
    </AppBar> 
    
    )
}

export default NavBar;