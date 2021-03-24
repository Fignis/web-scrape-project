import { Grid } from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import ProductListing from './ProductListing';
// import useSearchData from './useSearchData';
import axios from 'axios';

const Products = ({canRetrieve,isRetrieved}) => {

        const [ebayData,setEbayData] = useState([]);
       
        useEffect(()=>{
            const getEbayDbData= async()=> {
                const { data } = await axios.get('/scrape', (res)=>{
                    return res;
                })
                  
                setEbayData(data);  
            }
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
       <Grid>
       <Grid item direction='row'container xs={12}>    
    <ProductListing listings={ebayData} />
    </Grid>
</Grid>

    )
    }
export default Products;