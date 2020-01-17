import React from "react"

const ScanTable = ({ scanType, scanData }) => {
  const data = scanData.results
  const headings = Object.keys(data[0])

  return (
    <>
      <table>
        <thead>
          <tr>
            {headings.map(h => (
              <th scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
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
      {Object.values(record).map(v => (
        <td>{typeof v === "string" ? v : JSON.stringify(v)}</td>
      ))}
    </tr>
  )
}

export default ScanTable
