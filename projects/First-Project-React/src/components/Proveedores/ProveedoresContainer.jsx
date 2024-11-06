import  { useState, useEffect} from "react"
import ProveedoresView from "./ProveedoresView";

const ProveedoresContainer = () => {

    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState(true);


    const getDataProveedores = async () => {
        try{
            const response = await fetch("http://localhost:5000/proveedores",{
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

        getDataProveedores()   

    },[])

return(
    <ProveedoresView loadingData={loadingData} data={data} />
)

}

export default ProveedoresContainer