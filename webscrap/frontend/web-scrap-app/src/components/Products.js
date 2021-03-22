import { Grid } from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import ProductListing from './ProductListing';
// import useSearchData from './useSearchData';
import axios from 'axios';

// const Products = ({canRetrieve,isRetrieved}) => {
       const Products = ({canRetrieve})=>{
   
        const [ebayData,setEbayData] = useState([]);
        useEffect(()=>{
            const getEbayDbData= async()=> {
                const { data } = await axios.get('/scrape', (res)=>{
                    return res;
                })
                  
                setEbayData(data);  
            }
            getEbayDbData();
        },[canRetrieve])
        console.log(ebayData);
    
//         const ebayDataFromSearch =  useSearchData(canRetrieve);
// console.log(ebayDataFromSearch);
//  isRetrieved(false);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
    <ProductListing listings={ebayData} />
    
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