import axios from "axios";
import { useState } from "react";

const useSearchData=(searchDone)=>{
const [ebayData,setEbayData] = useState(null);
    if(searchDone){
        (async() => {
            const { data } = await axios.get('/data', (res) => {
                return res;
            }
            );
            setEbayData(data);
        })();
        return(ebayData)
}
    
    }
export default useSearchData;