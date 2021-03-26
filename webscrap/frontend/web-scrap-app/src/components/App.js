import React, { useCallback, useState } from "react";
import {Grid,CircularProgress} from '@material-ui/core';
import Products from './Products';
import NavBar from "./NavBar";
import SearchBar from './SearchBar';

const App = ()=>{
 const [checkIfSent,setCheckIfSent]= useState(false);
 const [loading, setLoading] = useState(false);
 const onSearched= useCallback(
  (checkIfSent)=>{
    console.log(checkIfSent);
     setCheckIfSent(checkIfSent);
  
   },
  [],
)
const onLoading = useCallback(
    (isLoading)=>{
      setLoading(isLoading)
    }
  ,
  [],
)
  
 
  return (
    <Grid container direction="column">
      <Grid item>
      <NavBar/>
      </Grid>
      <Grid item container>
      <Grid item xs={false} sm={1} />
      <Grid item xs={8} >
        <SearchBar loading={onLoading} onSearched={onSearched }/>
      </Grid>
      <Grid item xs={false} sm={1} />
      </Grid>
     <Grid item container >
  
      <Grid item xs={false} sm={1} />
     
      <Grid item xs={8}>    
   <Products  loaded={loading} loading={onLoading}canRetrieve={checkIfSent} isRetrieved={onSearched}  /> 
     </Grid>
     <Grid item xs={false} sm={1}/>
    </Grid>
</Grid>
  )
}
export default App;
