import React from "react";
import {Grid} from '@material-ui/core';
import Products from './Products';
import NavBar from "./NavBar";
import SearchBar from './SearchBar';
const App = ()=>{
  return (
    <Grid container direction="column">
      <Grid item>
      <NavBar/>
      </Grid>
      <Grid item container>
      <Grid item xs={false} sm={1} />
      <Grid item xs={8} >
        <SearchBar/>
      </Grid>
      <Grid item xs={false} sm={1} />
      </Grid>
     <Grid item container >
       
      <Grid item xs={false} sm={1} />
     
      <Grid item xs={8}>
 <Products/>
     </Grid>
     <Grid item xs={false} sm={1}/>
    </Grid>
</Grid>
  )
}
export default App;
