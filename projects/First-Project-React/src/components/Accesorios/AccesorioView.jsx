import { Fragment } from "react"
import { ProgressSpinner } from "primereact/progressspinner"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



const AccesorioView = ({loadingData, data}) =>{


return(

    
    <Fragment>
        <h1>Accesorio</h1>
        {loadingData ? <ProgressSpinner/> : 

        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="id"></Column>
            <Column field="tipo" header="Tipo"></Column>
            <Column field="descripcion" header="Descripcion"></Column>
            <Column field="proveedor.nombre" header="Proveedor"></Column>

        </DataTable>
        }

    </Fragment>
)
}
export default AccesorioView
