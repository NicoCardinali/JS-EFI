import  { useState, useEffect} from "react"
import ModeloView from "./ModeloView";

const ModeloContainer = () => {

    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState(true);


    const getDataModelo = async () => {
        try{
            const response = await fetch("http://localhost:5000/modelos",{
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

        getDataModelo()   

    },[])

return(
    <ModeloView loadingData={loadingData} data={data} />
)

}

export default ModeloContainer