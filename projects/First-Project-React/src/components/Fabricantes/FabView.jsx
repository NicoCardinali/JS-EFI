import { Fragment } from "react"
import { ProgressSpinner } from "primereact/progressspinner"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



const FabView = ({loadingData, data}) =>{




return(

    
    <Fragment>
        <h1>Fabricantes</h1>
        {loadingData ? <ProgressSpinner/> : 

        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="id"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="pais_origen" header="Pais de Origen"></Column>



        </DataTable>
        }

    </Fragment>
)
}
export default FabView
