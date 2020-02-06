import React from 'react';

const ScanTable = ({ scanData, columns }) => {
  return (
    <div className="grid-row">
      <table className="usa-table">
        <thead>
          <tr>
            {Object.values(columns).map(h => (
              <th scope="col" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scanData.map(d => (
            <ScanTableRow key={d[0]} record={d} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ScanTableRow = ({ record }) => {
  return (
    <tr>
      {record.map((r, i) => (
        <td key={`${r}-${i}`}>{r}</td>
      ))}
    </tr>
  );
};

export default ScanTable;
