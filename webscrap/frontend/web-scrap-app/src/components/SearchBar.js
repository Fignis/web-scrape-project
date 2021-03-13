import React, { useState } from 'react';
import {InputBase,IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
const SearchBar =()=>{
    const [searchTerm,setSearchTerm] = useState("");
    const [ebayData,setEbayData]= useState([]);
 function updateSearchTerm (e){
    e.preventDefault()
    setSearchTerm(e.target.value);
 }
 const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      margin:"2px"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    
    },
    iconButton: {
      padding: 10,
      color:'blue'
    }}))
    const classes = useStyles()
    return(
        <Paper component="form" className={classes.root}>
              <InputBase
              variant="outlined"
        className={classes.input}
        placeholder="Search an item"
        onChange={updateSearchTerm}
        value={searchTerm}
        inputProps={{ 'aria-label': 'Search an item' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>  
        </Paper>
     )
}
export default SearchBar;
