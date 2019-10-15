import React from 'react'


export default function TableHead(props) {
    const {colNames}=props
   
    return (
        <thead>
            <tr>
            {
                colNames.map((item,i)=>(
                    
                    <th key={i}>{item}</th>
                ))
            }
            </tr>     
           
           
        </thead>
    )
}
