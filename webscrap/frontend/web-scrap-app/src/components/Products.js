import { Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import ProductListing from './ProductListing';

const Products = ({searchDone}) => {
        const [ebayData,setEbayData]= useState([]);
        if (searchDone){
        const getDbData = ()=>{
                const {data}= axios.get('/scrape',(req,res)=>{
                        
                })
        }
}
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
    <ProductListing />
    </Grid>
            <Grid item xs={12} sm={4}>
    <ProductListing/>
    </Grid>
            <Grid item xs={12} sm={4}>
    <ProductListing/>
    </Grid>
            <Grid item xs={12} sm={4}>
    <ProductListing/>
    </Grid>
            <Grid item xs={12} sm={4}>
    <ProductListing/>
    </Grid>
    </Grid>
    )
}
export default Products;