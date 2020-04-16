import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

const fetchList = (reportType, list) => {
  return axios.get(`${API_BASE_URL}lists/${reportType}/${list}`);
};

const ReportFilters = ({ reportType }) => {
  const dictionary = { security: 'pshtt', design: 'uswds2' };
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);
  reportType = dictionary[reportType] || reportType;

  const fetchList = (reportType, list) => {
    return axios.get(`${API_BASE_URL}lists/${reportType}/${list}`);
  };

  useEffect(() => {
    axios.all([fetchList(reportType, 'agencies')]).then(
      axios.spread((agencies) => {
        setAgencies(agencies.data);
        setLoading(false);
      })
    );
  }, []);

  return loading ? (
    <div>Loading…</div>
  ) : (
    <AgenciesFilter agenciesList={agencies} />
  );
};

export default ReportFilters;

const AgenciesFilter = ({ agenciesList }) => {
  return (
    <select>
      {agenciesList.length == 0
        ? null
        : agenciesList.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
    </select>
  );
};
