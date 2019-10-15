import React from 'react'
import RowData from './RowData'

export default function TableBody(props) {
    const {userList}=props
   
    return (
        <tbody>
            {
                userList.map((dato,i)=>(
                   
                   <tr key={i}>
                      
                    <RowData
                        dato={dato}
                    />
                    </tr>
                ))
            }
           
        </tbody>
    )
}
