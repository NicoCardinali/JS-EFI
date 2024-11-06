import  { useState, useEffect} from "react"
import CaracteristicaView from "./CaracteristicaView";

const CaracteristicaContainer = () => {

    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState(true);


    const getDataCaracteristica = async () => {
        try{
            const response = await fetch("http://localhost:5000/caracteristicas",{
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

        getDataCaracteristica()   

    },[])

return(
    <CaracteristicaView loadingData={loadingData} data={data} />
)

}

export default CaracteristicaContainer