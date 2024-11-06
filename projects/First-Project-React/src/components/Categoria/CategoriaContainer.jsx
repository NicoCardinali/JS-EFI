import  { useState, useEffect} from "react"
import CategoriaView from "./CategoriaView";


const CategoriaContainer = () => {

    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState(true);


    const getDataCategoria = async () => {
        try{
            const response = await fetch("http://localhost:5000/categorias",{
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

        getDataCategoria()   

    },[])

return(
    <CategoriaView loadingData={loadingData} data={data} />
)

}

export default CategoriaContainer