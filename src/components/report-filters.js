import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { QueryContext, DispatchQueryContext } from './report-query-provider';

const ReportFilters = ({ reportType }) => {
  const dictionary = { security: 'pshtt', design: 'uswds2' };
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);
  reportType = dictionary[reportType] || reportType;

  const query = useContext(QueryContext);
  const dispatchQuery = useContext(DispatchQueryContext);

  const fetchList = (reportType, list) => {
    return axios.get(`${API_BASE_URL}lists/${reportType}/${list}`);
  };

  const handleFilterChange = (filter) => {
    // if (filter != query.filter) {
    dispatchQuery({
      type: `APPLY_FILTER`,
      newFilter: { filters: filter },
    });
    // }
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
    <AgenciesFilter
      handleFilterChange={handleFilterChange}
      agenciesList={agencies}
    />
  );
};

export default ReportFilters;

const AgenciesFilter = ({ agenciesList, handleFilterChange }) => {
  return (
    <select onChange={(e) => handleFilterChange({ agency: e.target.value })}>
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
