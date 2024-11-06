import  { useState, useEffect} from "react"
import EquipoView from "./EquipoView";

const EquipoContainer = () => {

    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState(true);


    const getDataEquipo = async () => {
        try{
            const response = await fetch("http://localhost:5000/equipos",{
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

        getDataEquipo()   

    },[])

return(
    <EquipoView loadingData={loadingData} data={data} />
)

}

export default EquipoContainer