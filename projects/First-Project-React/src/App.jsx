import { useState } from 'react';
import './App.css';
import UsersContainer from './components/Users/UsersContainer';
import CreateUser from './components/Users/CreateUser';
import LoginUser from './components/Users/LoginUser';
import FabContainer from './components/Fabricantes/FabContainer';
import ProveedoresContainer from './components/Proveedores/ProveedoresContainer';
import EquipoContainer from './components/Equipos/EquipoContainer';
import CategoriaContainer from './components/Categoria/CategoriaContainer';
import AccesorioContainer from './components/Accesorios/AccesorioContainer';
import MarcaContainer from './components/Marca/MarcaContainer';
import ModeloContainer from './components/Modelo/ModeloContainer';
import CaracteristicaContainer from './components/Caracteristicas/CaracteristicaContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('isUserLoggedIn') === 'true');
    const [message, setMessage] = useState(""); // Estado para el mensaje de respuesta

    // Función para cerrar sesión
    const handleLogout = () => {
        // Limpiar los datos en localStorage
        localStorage.removeItem('token');
        localStorage.setItem('isUserLoggedIn', 'false');
        setIsUserLoggedIn(false);
        setMessage("Has cerrado sesión exitosamente.");
    };

    const items = [
        { label: 'Nuevo Usuario', icon: 'pi pi-users', url: '/nuevo-usuario' },
        { label: 'Iniciar Sesion', icon: 'pi pi-users', url: '/inicio-sesion' },
        ...(isUserLoggedIn ? [
            { label: 'Usuarios', icon: 'pi pi-users', url: '/usuarios' },
            { label: 'Cerrar Sesión', icon: 'pi pi-users', command: handleLogout }
        ] : []),
    ];

    const items2 = [
        { label: 'Fabricantes', icon: 'pi pi-mobile', url: '/fabricantes' },
        { label: 'Proveedores', icon: 'pi pi-mobile', url: '/proveedores' },
        { label: 'Categorias', icon: 'pi pi-mobile', url: '/categorias' },
        { label: 'Caracteristicas', icon: 'pi pi-mobile', url: '/caracteristicas' },
        { label: 'Accesorios', icon: 'pi pi-mobile', url: '/accesorios' },
        { label: 'Marcas', icon: 'pi pi-mobile', url: '/marcas' },
        { label: 'Modelo', icon: 'pi pi-mobile', url: '/modelos' },
        { label: 'Equipos', icon: 'pi pi-mobile', url: '/equipos' },
    ];

    return (
        <BrowserRouter>
            <div>
                <h1>GESTION DE CELULARES</h1>
                <Menubar model={items} />
                <Routes>
                    <Route path='/nuevo-usuario' element={<CreateUser />} />
                    <Route path='/inicio-sesion' element={<LoginUser setIsUserLoggedIn={setIsUserLoggedIn} setMessage={setMessage} />} />

                    {isUserLoggedIn && (
                        <Route path='/usuarios' element={<UsersContainer />} />
                    )}
                </Routes>
                <Menubar model={items2} />
                <Routes>
                    <Route path='/fabricantes' element={<FabContainer />} />
                    <Route path='/proveedores' element={<ProveedoresContainer />} />
                    <Route path='/categorias' element={<CategoriaContainer />} />
                    <Route path='/caracteristicas' element={<CaracteristicaContainer />} />
                    <Route path='/accesorios' element={<AccesorioContainer />} />
                    <Route path='/marcas' element={<MarcaContainer />} />
                    <Route path='/modelos' element={<ModeloContainer />} />
                    <Route path='/equipos' element={<EquipoContainer />} />
                </Routes>

                {/* Mostrar mensaje de login */}
                {message && <div>{message}</div>}
            </div>
        </BrowserRouter>
    );
}

export default App;
