import React from 'react'

const DataTable = ({ appo }) => {
    const columns = appo[0] && Object.keys(appo[0])
    return (
        <>
            <table className="table" cellPadding={15} cellSpacing={10} >
                <thead>
                    <tr  >{appo[0] && columns.map(heading => <th key={appo.id} >{heading}</th>)}</tr>
                </thead>
                <tbody>
                    {appo.map(row => <tr   >{columns.map(column => <td key={appo.id}>{row[column]}</td>)}</tr>)}
                </tbody>
            </table>
        </>
    )
}

export default DataTable
