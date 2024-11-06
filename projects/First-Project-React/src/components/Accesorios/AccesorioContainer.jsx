import  { useState, useEffect} from "react"
import AccesorioView from "./AccesorioView";

const AccesorioContainer = () => {

    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState(true);


    const getDataAccesorio = async () => {
        try{
            const response = await fetch("http://localhost:5000/accesorios",{
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

        getDataAccesorio()   

    },[])

return(
    <AccesorioView loadingData={loadingData} data={data} />
)

}

export default AccesorioContainer