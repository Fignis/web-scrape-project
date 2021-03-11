import React from "react";
import {Grid} from '@material-ui/core';
import Products from './Products';
import NavBar from "./NavBar";
const App = ()=>{
  return (
    <Grid container direction="column">
      <Grid item>
      <NavBar/>
      </Grid>
     <Grid item container >
      <Grid item xs={false} sm={2} />
      <Grid item xs={8}>
 <Products/>
     </Grid>
     <Grid item xs={false} sm={2}/>
    </Grid>
</Grid>
  )
}
export default App;
