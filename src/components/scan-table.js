import React from "react"

const ScanTable = ({ scanType, scanData, columns }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map(h => (
              <th scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scanData.map(d => (
            <ScanTableRow record={d} />
          ))}
        </tbody>
      </table>
    </>
  )
}

const ScanTableRow = ({ record }) => {
  return (
    <tr>
      {record.map(r => (
        <td>{r}</td>
      ))}
    </tr>
  )
}

export default ScanTable
