import { Fragment, useRef, useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

const EquipoView = ({ loadingData, data }) => {
    const [message, setMessage] = useState("");
    const [editingEquipo, setEditingEquipo] = useState(null);
    const [creatingEquipo, setCreatingEquipo] = useState(false);
    const [nombre, setNombre] = useState('');
    const [anio, setAnio] = useState('');
    const [costo, setCosto] = useState('');
    const [modeloId, setModeloId] = useState('');
    const [modelos, setModelos] = useState([]);  // Estado para los modelos
    const toast = useRef(null);

    const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Obtener la lista de modelos al cargar el componente
    useEffect(() => {
        const fetchModelos = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/modelos", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            setModelos(result);
        };

        fetchModelos();
    }, []);

    // Función para abrir el formulario de edición
    const editEquipo = (equipo) => {
        setEditingEquipo(equipo);
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
        } else if (respuesta.msg === "Not enough segments") {
            setMessage("No ha iniciado sesión!");
        } else if (respuesta.Mensaje === "El usuario no es administrador") {
            setMessage("Usuario no autorizado para editar equipos.");
        } else if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Confirmado', detail: 'Equipo actualizado con éxito', life: 3000 });
            await pause(2000);
            window.location.reload();
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: respuesta.Mensaje || 'No se pudo actualizar el equipo', life: 3000 });
        }
    };

    // Función para abrir el formulario de creación de equipo
    const openCreateForm = () => {
        setCreatingEquipo(true);
        setNombre('');
        setAnio('');
        setCosto('');
        setModeloId('');
    };

    // Función para guardar el nuevo equipo
    const saveNewEquipo = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/equipos`, {
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
        } else if (respuesta.msg === "Not enough segments") {
            setMessage("No ha iniciado sesión!");
        } else if (respuesta.Mensaje === "El usuario no es administrador") {
            setMessage("Usuario no autorizado para crear equipos.");
        } else if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Confirmado', detail: 'Equipo creado con éxito', life: 3000 });
            await pause(2000);
            window.location.reload();
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: respuesta.Mensaje || 'No se pudo crear el equipo', life: 3000 });
        }
    };

    const deleteEquipo = async (equipoId) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/borrar_equipo/${equipoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const respuesta = await response.json();

        if (respuesta.msg === "Token has expired") {
            setMessage("Su sesión expiró!");
        } else if (respuesta.msg === "Not enough segments") {
            setMessage("No ha iniciado sesión!");
        } else if (respuesta.Mensaje === "El usuario no es administrador") {
            setMessage("Usuario no autorizado para eliminar equipos.");
        } else if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Confirmado', detail: 'Se eliminó el equipo', life: 3000 });
            await pause(2000);
            window.location.reload();
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: respuesta.Mensaje || 'No se pudo eliminar el equipo', life: 3000 });
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

            <Button label="Agregar Nuevo Equipo" onClick={openCreateForm} />

            {/* Formulario de edición */}
            {(editingEquipo || creatingEquipo) && (
                <div>
                    <h2>{creatingEquipo ? "Crear Nuevo Equipo" : "Editar Equipo"}</h2>
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
                        <label>Modelo:</label>
                        <Dropdown
                            value={modeloId}
                            options={modelos.map(modelo => ({ label: modelo.nombre, value: modelo.id }))}
                            onChange={(e) => setModeloId(e.value)}
                            placeholder="Seleccionar Modelo"
                        />
                    </div>
                    <div>
                        <Button label="Guardar" onClick={creatingEquipo ? saveNewEquipo : saveEdit} />
                        <Button label="Cancelar" onClick={() => { setEditingEquipo(null); setCreatingEquipo(false); }} />
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
