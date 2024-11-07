import { Fragment, useRef, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const EquipoView = ({ loadingData, data }) => {
    const [message, setMessage] = useState(""); // Estado para el mensaje de respuesta
    const [editingEquipo, setEditingEquipo] = useState(null);  // Para controlar el equipo que se está editando
    const [isCreating, setIsCreating] = useState(false); // Estado para controlar si se está creando un equipo
    const [nombre, setNombre] = useState('');
    const [anio, setAnio] = useState('');
    const [costo, setCosto] = useState('');
    const [modeloId, setModeloId] = useState('');
    const toast = useRef(null);

    const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Función para abrir el formulario de creación
    const openCreateForm = () => {
        setIsCreating(true);
        setEditingEquipo(null); // Asegura que no haya equipo en edición
        setNombre('');
        setAnio('');
        setCosto('');
        setModeloId('');
    };

    // Función para crear un nuevo equipo
    const createEquipo = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/equipos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre: nombre,
                anio: anio,
                costo: costo,
                modelo_id: modeloId
            })
        });

        const respuesta = await response.json();

        if (respuesta.msg === "Token has expired") {
            setMessage("Su sesión expiró!");
        } else if (respuesta.msg == "Not enough segments") {
            setMessage("No ha iniciado sesión!");
        } else if (respuesta.Mensaje == "El usuario no es administrador") {
            setMessage("Usuario no administrador. No autorizado a crear equipos");
        } else if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Confirmado', detail: 'Equipo creado con éxito', life: 3000 });
            await pause(2000);
            window.location.reload();
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: respuesta.Mensaje || 'No se pudo crear el equipo', life: 3000 });
        }
    };

    // Función para abrir el formulario de edición
    const editEquipo = (equipo) => {
        setEditingEquipo(equipo);
        setIsCreating(false); // No estamos creando un equipo
        setNombre(equipo.nombre);
        setAnio(equipo.anio);
        setCosto(equipo.costo);
        setModeloId(equipo.modelo_id);
    };

    // Función para guardar los cambios del formulario de edición
    const saveEdit = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/editar_equipo/${editingEquipo.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre: nombre,
                anio: anio,
                costo: costo,
                modelo_id: modeloId
            })
        });

        const respuesta = await response.json();

        if (respuesta.msg === "Token has expired") {
            setMessage("Su sesión expiró!");
        } else if (respuesta.msg == "Not enough segments") {
            setMessage("No ha iniciado sesión!");
        } else if (respuesta.Mensaje == "El usuario no es administrador") {
            setMessage("Usuario no administrador. No autorizado a editar equipos");
        } else if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Confirmado', detail: 'Equipo actualizado con éxito', life: 3000 });
            await pause(2000);
            window.location.reload();
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: respuesta.Mensaje || 'No se pudo actualizar el equipo', life: 3000 });
        }
    };

    const bodyAccions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-trash' label="Eliminar" onClick={() => deleteEquipo(rowData.id)} />
                <Button icon='pi pi-pencil' label="Editar" onClick={() => editEquipo(rowData)} />
            </div>
        );
    };

    return (
        <Fragment>
            <h1>Equipos</h1>
            <Button label="Crear Equipo" icon="pi pi-plus" onClick={openCreateForm} />
            {loadingData ? <ProgressSpinner /> :
                <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID"></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="anio" header="Año"></Column>
                    <Column field="costo" header="Precio de Venta"></Column>
                    <Column field="modelo.nombre" header="Modelo"></Column>
                    <Column body={bodyAccions} header="Acciones"></Column>
                </DataTable>
            }

            {(editingEquipo || isCreating) && (
                <div>
                    <h2>{isCreating ? "Crear Equipo" : "Editar Equipo"}</h2>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Año:</label>
                        <input
                            type="number"
                            value={anio}
                            onChange={(e) => setAnio(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Precio de Venta:</label>
                        <input
                            type="number"
                            value={costo}
                            onChange={(e) => setCosto(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Modelo ID:</label>
                        <input
                            type="text"
                            value={modeloId}
                            onChange={(e) => setModeloId(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button label={isCreating ? "Crear" : "Guardar Cambios"} onClick={isCreating ? createEquipo : saveEdit} />
                        <Button label="Cancelar" onClick={() => { setEditingEquipo(null); setIsCreating(false); }} />
                    </div>
                </div>
            )}

            <Toast ref={toast} />
            <ConfirmDialog />
            {message && <div>{message}</div>}
        </Fragment>
    );
};

export default EquipoView;
