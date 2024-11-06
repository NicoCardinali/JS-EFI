import { Fragment, useRef } from "react"
import { ProgressSpinner } from "primereact/progressspinner"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog,confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';


const EquipoView = ({loadingData, data}) =>{

    const toast = useRef(null)

    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Confirmado', detail: 'Se eliminó el usuario', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Eliminación cancelada', life: 3000 });
    }

    const deleteEquipo = () => {
        confirmDialog({
            message: '¿Quiere eliminar el Usuario?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    }



    const bodyAccions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-trash' label="Eliminar" onClick={deleteEquipo}/>
                <Button icon='pi pi-pencil' label="Editar"/>

            </div>
        )
    }



return(

    
    <Fragment>
        <h1>Equipos</h1>
        {loadingData ? <ProgressSpinner/> : 

        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="id"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="anio" header="Año"></Column>
            <Column field="costo" header="Precio de Venta"></Column>
            <Column field="modelo.nombre" header="Modelo"></Column>

            <Column body={bodyAccions} header="Acciones"></Column>



        </DataTable>
        }
        <Toast ref={toast} />
        <ConfirmDialog />
    </Fragment>
)
}
export default EquipoView
