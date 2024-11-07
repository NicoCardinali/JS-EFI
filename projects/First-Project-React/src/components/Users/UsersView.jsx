import { Fragment, useRef, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const UserView = ({ loadingData, data }) => {
    const [editingUser, setEditingUser] = useState(null);  // Para controlar el usuario que se está editando
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const toast = useRef(null);

    const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Función para abrir el formulario de edición
    const editUser = (user) => {
        setEditingUser(user);
        setUsername(user.username);
        setPassword('');
        setIsAdmin(user.is_admin);
    };

    // Función para guardar los cambios del formulario de edición
    const saveEdit = async () => {
        const token = localStorage.getItem("token"); // Obtener el token del localStorage
        const response = await fetch(`http://localhost:5000/editar_users/${editingUser.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Pasar el token para autorización
            },
            body: JSON.stringify({
                username: username,
                password: password,
                is_admin: isAdmin
            })
        });

        if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Confirmado', detail: 'Usuario actualizado con éxito', life: 3000 });
            await pause(2000); // Hacer una pausa de 2 segundos antes de refrescar
            window.location.reload();
        } else {
            const result = await response.json();
            toast.current.show({ severity: 'error', summary: 'Error', detail: result.Mensaje || 'No se pudo actualizar el usuario', life: 3000 });
        }
    };

    const deleteUser = async (userId) => {
        const token = localStorage.getItem("token"); // Obtener el token del localStorage
        const response = await fetch(`http://localhost:5000/borrar_users/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Pasar el token para autorización
            }
        });

        if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Confirmado', detail: 'Se eliminó el usuario', life: 3000 });
            await pause(2000); // Hacer una pausa de 2 segundos antes de refrescar
            window.location.reload();
        } else {
            const result = await response.json();
            toast.current.show({ severity: 'error', summary: 'Error', detail: result.Mensaje || 'No se pudo eliminar el usuario', life: 3000 });
        }
    };

    const bodyAccions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-trash' label="Eliminar" onClick={() => deleteUser(rowData.id)} />
                <Button icon='pi pi-pencil' label="Editar" onClick={() => editUser(rowData)} />
            </div>
        );
    };

    const hasIsAdmin = data && data.length > 0 && 'is_admin' in data[0];

    return (
        <Fragment>
            <h1>Usuarios</h1>
            {loadingData ? <ProgressSpinner /> :
                <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID"></Column>
                    <Column field="username" header="Username"></Column>
                    {hasIsAdmin && <Column field="is_admin" header="¿Es Administrador?" />}
                    {hasIsAdmin && <Column body={bodyAccions} header="Acciones" />}
                </DataTable>
            }

            {/* Formulario de edición */}
            {editingUser && (
                <div>
                    <h2>Editar Usuario</h2>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Es Administrador:</label>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={() => setIsAdmin(!isAdmin)}
                        />
                    </div>
                    <div>
                        <Button label="Guardar Cambios" onClick={saveEdit} />
                        <Button label="Cancelar" onClick={() => setEditingUser(null)} />
                    </div>
                </div>
            )}

            <Toast ref={toast} />
            <ConfirmDialog />
        </Fragment>
    );
};

export default UserView;
