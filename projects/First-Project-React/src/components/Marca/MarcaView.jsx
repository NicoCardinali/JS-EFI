import { Fragment } from "react"
import { ProgressSpinner } from "primereact/progressspinner"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



const MarcaView = ({loadingData, data}) =>{


return(

    
    <Fragment>
        <h1>Marcas</h1>
        {loadingData ? <ProgressSpinner/> : 

        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="id"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="fabricante.nombre" header="Fabricante"></Column>
            <Column field="proveedor.nombre" header="Proveedor"></Column>

        </DataTable>
        }

    </Fragment>
)
}
export default MarcaView
