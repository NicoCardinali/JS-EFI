import  { useState, useEffect} from "react"
import UserView from "./UsersView";

const UsersContainer = () => {

    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState(true);

    const token = localStorage.getItem("token");

    const getDataUsers = async () => {
        try{
            const response = await fetch("http://localhost:5000/users",{
                method:'GET',
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                }
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

        getDataUsers()   

    },[])

return(
    <UserView loadingData={loadingData} data={data} />
)

}

export default UsersContainer