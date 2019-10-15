import React from 'react'

export default function RowData(props) {
    const{dato}=props
    return (
        <>
            <td style={dato.style}>{dato.item}</td>
            <td>{dato.carnes}</td>
            <td>{dato.pollo}</td>
            <td>{dato.cerdo}</td>
            <td>{dato.pescados}</td>
            <td>{dato.total}</td>
        </>
    )
}
