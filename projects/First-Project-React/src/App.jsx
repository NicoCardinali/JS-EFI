import { useState } from 'react'
import './App.css'
import UsersContainer from './components/Users/UsersContainer'
import CreateUser from './components/Users/CreateUser'
import LoginUser from './components/Users/LoginUser'
import FabContainer from './components/Fabricantes/FabContainer'
import ProveedoresContainer from './components/Proveedores/ProveedoresContainer'
import EquipoContainer from './components/Equipos/EquipoContainer'
import CategoriaContainer from './components/Categoria/CategoriaContainer'
import AccesorioContainer from './components/Accesorios/AccesorioContainer'
import MarcaContainer from './components/Marca/MarcaContainer'
import ModeloContainer from './components/Modelo/ModeloContainer'
import CaracteristicaContainer from './components/Caracteristicas/CaracteristicaContainer'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { Menubar } from 'primereact/menubar';
       
function App() {

    const items = [
        {label: 'Nuevo Usuario', icon:'pi pi-users', url: '/nuevo-usuario' },
        {label: 'Iniciar Sesion', icon:'pi pi-users', url: '/inicio-sesion' },
        {label: 'Usuarios', icon:'pi pi-users', url: '/usuarios' },
    ]
    const items2 = [
        {label: 'Fabricantes', icon:'pi pi-mobile', url: '/fabricantes' },
        {label: 'Proveedores', icon:'pi pi-mobile', url: '/proveedores' },
        {label: 'Categorias', icon:'pi pi-mobile', url: '/categorias' },
        {label: 'Caracteristicas', icon:'pi pi-mobile', url: '/caracteristicas' },
        {label: 'Accesorios', icon:'pi pi-mobile', url: '/accesorios' },
        {label: 'Marcas', icon:'pi pi-mobile', url: '/marcas' },
        {label: 'Modelo', icon:'pi pi-mobile', url: '/modelos' },
        {label: 'Equipos', icon:'pi pi-mobile', url: '/equipos' }

    ]
    return (

        <BrowserRouter>
        <div>
        <h1>GESTION DE CELULARES</h1>
            <Menubar model={items}/>
            <Routes>
                <Route path='/nuevo-usuario' element={<CreateUser />} ></Route>
                <Route path='/inicio-sesion' element={<LoginUser />} ></Route>
                <Route path='/usuarios' element={<UsersContainer />} ></Route>
            </Routes>
            <Menubar model={items2}/>
            <Routes>
                <Route path='/fabricantes' element={<FabContainer />} ></Route>
                <Route path='/proveedores' element={<ProveedoresContainer />} ></Route>
                <Route path='/categorias' element={<CategoriaContainer />} ></Route>
                <Route path='/caracteristicas' element={<CaracteristicaContainer />} ></Route>
                <Route path='/accesorios' element={<AccesorioContainer />} ></Route>
                <Route path='/marcas' element={<MarcaContainer />} ></Route>
                <Route path='/modelos' element={<ModeloContainer />} ></Route>
                <Route path='/equipos' element={<EquipoContainer />} ></Route>

            </Routes>
        </div>   
        </BrowserRouter>
    )
}

export default App
