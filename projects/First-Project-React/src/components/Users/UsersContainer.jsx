import { useState, useEffect } from "react";
import UserView from "./UsersView";

const UsersContainer = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]); // Aquí guardas la lista de usuarios
    const [loadingData, setLoadingData] = useState(true);

    const token = localStorage.getItem("token");

    const getDataUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                setMessage("No ha iniciado sesión o la misma expiró!");
            }

            const results = await response.json();
            setData(results);
        } catch (error) {
            console.log("Error en la api");
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        getDataUsers();
    }, []);



    return (
        <div>
            {message === "No ha iniciado sesión o la misma expiró!" && (
                <div style={{ color: "red", marginBottom: "10px" }}>{message}</div> // Solo muestra el mensaje específico
            )}
            <UserView loadingData={loadingData} data={data} />
        </div>
    );
};

export default UsersContainer;
