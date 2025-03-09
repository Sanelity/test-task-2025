import { Table } from "react-bootstrap";

import { TableItem } from "./tableItem";
import { TableTitle } from "./tableTitle";

import './tableFactory.css'

export function TableFactory({data, API, VAR}){



    if(data) return (
      <div className="table-container">
        <Table striped bordered hover responsive>
            <TableTitle API={API} VAR={VAR}/>
            <tbody>
                {Object.keys(data).map(item => (
                  <TableItem key={item} data={data[item]} API={API} VAR={VAR}></TableItem>
                ))}
            </tbody>
        </Table>
      </div>
        
    )

    
}