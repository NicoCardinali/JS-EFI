import { Fragment } from "react"
import { ProgressSpinner } from "primereact/progressspinner"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const CaracteristicaView = ({loadingData, data}) =>{

 
return(

    
    <Fragment>
        <h1>Caracteristicas</h1>
        {loadingData ? <ProgressSpinner/> : 

        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="id"></Column>
            <Column field="tipo" header="Tipo"></Column>
            <Column field="descripcion" header="Descripcion"></Column>

        </DataTable>
        }

    </Fragment>
)
}
export default CaracteristicaView
