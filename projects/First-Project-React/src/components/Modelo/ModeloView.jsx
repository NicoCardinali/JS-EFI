import { Fragment } from "react"
import { ProgressSpinner } from "primereact/progressspinner"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



const ModeloView = ({loadingData, data}) =>{


return(

    
    <Fragment>
        <h1>Modelos</h1>
        {loadingData ? <ProgressSpinner/> : 

        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="id"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="marca.nombre" header="Marca"></Column>
            <Column field="categoria.tipo" header="Categoria"></Column>
            <Column field="caracteristica.tipo" header="Caracteristica"></Column>

        </DataTable>
        }

    </Fragment>
)
}
export default ModeloView
