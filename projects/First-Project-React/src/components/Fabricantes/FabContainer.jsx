import  { useState, useEffect} from "react"
import FabView from "./FabView";

const FabContainer = () => {

    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState(true);


    const getDataFab = async () => {
        try{
            const response = await fetch("http://localhost:5000/fabricantes",{
                method:'GET'
            })
            console.log("response", response)
            if(!response.ok){
                console.log("hubo un error en la consulta")
            }
            const results = await response.json()
            setData(results)
            console.log("data", results)

        }catch{
            console.log("Error en la api")
        }finally{
            setLoadingData(false)
        }        
    }

    useEffect(()=>{

        getDataFab()   

    },[])

return(
    <FabView loadingData={loadingData} data={data} />
)

}

export default FabContainer