import React, { useState, useEffect, Suspense } from "react"

const Scan = ({ scanType }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [scanData, setScanData] = useState({})
  const apiBaseUrl = `https://site-scanning.app.cloud.gov/api/v1/scans/`

  const fetchScanData = async () => {
    const resp = await fetch(`${apiBaseUrl}${scanType}`)
    const json = await resp.json()

    setScanData(prevState => ({ ...prevState, [scanType]: json }))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchScanData()
  }, [])

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <ScanTable scanType={scanType} scanData={scanData} />
  )
}

const ScanTable = ({ scanType, scanData }) => {
  let data = scanData[scanType]
  data = data.slice(0, 30)
  const headings = Object.keys(data[0])

  return (
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

export default () => (
  <>
    <h1>Information for Privacy Officers</h1>
    <Scan scanType={"privacy"} />
  </>
)
