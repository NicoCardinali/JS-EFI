import { Fragment } from "react"
import { ProgressSpinner } from "primereact/progressspinner"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



const ProveedoresView = ({loadingData, data}) =>{


return(

    
    <Fragment>
        <h1>Proveedores</h1>
        {loadingData ? <ProgressSpinner/> : 

        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="id"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="correo" header="Email"></Column>
            <Column field="celular" header="Telefono"></Column>

        </DataTable>
        }

    </Fragment>
)
}
export default ProveedoresView
