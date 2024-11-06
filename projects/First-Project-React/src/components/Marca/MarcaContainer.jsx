import  { useState, useEffect} from "react"
import MarcaView from "./MarcaView";

const MarcaContainer = () => {

    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState(true);


    const getDataMarca = async () => {
        try{
            const response = await fetch("http://localhost:5000/marcas",{
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

        getDataMarca()   

    },[])

return(
    <MarcaView loadingData={loadingData} data={data} />
)

}

export default MarcaContainer