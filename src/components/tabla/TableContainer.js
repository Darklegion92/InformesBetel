import React, { Component } from 'react';
import TableHead from './TableHead'
import TableBody from './TableBody'
import "./Tabla.css"

export default class TableContainer extends Component {
    
        state = { 
            data:[
                {
                    item:"inventarioinicial",
                    carnes:"$ 14,539,762",
                    pollo:"$ 11,447,269 ",
                    cerdo:"$ 5,827,740",
                    pescados:"$ 2,961,920",
                    total:"$ 34,776,690",
                    style:{
                        background:"blue",
                        color:"white"
                    }
                },
                {
                    item:"compras",
                    carnes:"$ 14,539,762",
                    pollo:"$ 11,447,269 ",
                    cerdo:"$ 5,827,740",
                    pescados:"$ 2,961,920",
                    total:"$ 34,776,690"
                }
                    
            ],
            headName:[
                "items","carnes","pollo","cerdo","pescados","total"
            ]
         }
    

    render() { 
        let users=(this.state.data.map(item=>(item)))
       
        return ( 
            <div>
            <table border="1">
                       <TableHead
                        colNames={this.state.headName}
                       />
                       <TableBody
                       userList={users}/>
		</table>
        </div>

         );
    }
}
 
