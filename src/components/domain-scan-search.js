import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { API_BASE_URL } from '../constants';

const DomainScanSearch = () => {
  const [domain, setDomain] = useState('');
  const [scans, setScans] = useState([]);

  const domainScans = [
    { id: `allScans`, label: `Perform all checks` },
    { id: `a11yScan`, label: `Accessibility` },
    { id: `analyticsScan`, label: `Analytics` },
    { id: `contentScan`, label: `Content` },
    { id: `designScan`, label: `Design` },
    { id: `mobileScan`, label: `Mobile-friendliness` },
    { id: `perfScan`, label: `Performance` },
    { id: `securityScan`, label: `Security` },
  ];

  const getFormValues = (form) => {
    const domain = form.searchDomain.value;
    const checkedCheckboxes = form.querySelectorAll(
      '[type="checkbox"]:checked'
    );
    const checkboxReducer = (accumulator, current) => [
      ...accumulator,
      current.id,
    ];
    const scans = Array.from(checkedCheckboxes).reduce(checkboxReducer, []);
    return {
      domain: domain,
      scans: scans,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const { domain, scans } = getFormValues(form);
    setDomain(domain);
    setScans(scans);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Scan a Website</h2>
      <label htmlFor="searchDomain">
        Enter a website (e.g., gsa.gov, analytics.usa.gov, congress.gov)
      </label>
      <input type="text" name="searchDomain" id="searchDomain" />
      <ul>
        {domainScans.map((scan) => (
          <li key={scan.id}>
            <label for={scan.id}>
              <input type="checkbox" name={scan.id} id={scan.id} />
              {scan.label}
            </label>
          </li>
        ))}
      </ul>
      <input type="submit" value="Submit" />
    </form>
  );
};

const DomainScanReports = ({ data }) => {
  // const queryUrl = `${API_BASE_URL}domains/${domain}`;
  // const reports = useFetch(queryUrl, {});
  // if (!reports.response) return <p>Loading</p>;
  // return <div>{reports.response}</div>;
};

export default DomainScanSearch;
