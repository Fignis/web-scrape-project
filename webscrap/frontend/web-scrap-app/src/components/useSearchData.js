import axios from "axios";
import { useEffect, useState } from "react";

const useSearchData=(searchDone)=>{
const [ebayData,setEbayData] = useState([]);
    useEffect(()=>{
        const getEbayDbData= async()=> {
            const { data } = await axios.get('/data', (res)=>{
                return res.json()
            })
            getEbayDbData();    
            setEbayData(data);  
        }
        
    },[searchDone])
        return(ebayData)
}
    
export default useSearchData;