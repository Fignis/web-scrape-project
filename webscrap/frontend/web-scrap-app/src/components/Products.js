import { Grid } from '@material-ui/core';
import React from 'react';
import ProductListing from './ProductListing';
import useSearchData from './useSearchData';

const Products = ({canRetrieve,isRetrieved}) => {
    const ebayDataFromSearch = useSearchData(canRetrieve);
    
    isRetrieved(false);



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