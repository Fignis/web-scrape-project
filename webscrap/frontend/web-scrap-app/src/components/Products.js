import { CircularProgress, Grid } from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import ProductListing from './ProductListing';
// import useSearchData from './useSearchData';
import axios from 'axios';

const Products = ({loaded,loading, canRetrieve,isRetrieved}) => {

        const [ebayData,setEbayData] = useState([]);
        const getEbayDbData= async()=> {
            const { data } = await axios.get('/scrape')
            setEbayData(data); 
            loading(false)
           
        }
        useEffect(()=>{
           
            getEbayDbData();
            return ()=>{
                console.log('cleanup')
                isRetrieved(false)
              
            }
            
        },[canRetrieve])
        console.log(ebayData);
      
//         const ebayDataFromSearch =  useSearchData(canRetrieve);
// console.log(ebayDataFromSearch);
//  isRetrieved(false);

    return (
     <React.Fragment>
   {loaded? 
   <Grid alignItems="center" container ><CircularProgress color="secondary"></CircularProgress>
   </Grid>:  
   <Grid>
   <Grid item direction='row'container xs={12}>
   <ProductListing listings={ebayData} />
</Grid>
</Grid>}
</React.Fragment>
    )
    }
export default Products;