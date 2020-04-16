import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Downshift from 'downshift';
import { API_BASE_URL } from '../constants';

const ReportFilters = ({ reportType, filters }) => {
  const [loading, setLoading] = useState(true);
  const [agencies, setAgencies] = useState([]);
  const dictionary = { security: 'pshtt', design: 'uswds2' };
  reportType = dictionary[reportType] || reportType;

  const fetchList = (reportType, list) => {
    return axios.get(`${API_BASE_URL}lists/${reportType}/${list}`);
  };

  axios.all([fetchList(reportType, 'agencies')]).then(
    axios.spread((agencies) => {
      setAgencies(agencies.data);
      setLoading(false);
    })
  );

  return loading ? (
    <div>Loading…</div>
  ) : (
    <AgenciesFilter agenciesList={agencies} />
  );
};

export default ReportFilters;

const AgenciesFilter = ({ agenciesList }) => {
  return agenciesList.length == 0 ? null : (
    <select>
      {agenciesList.map((a) => (
        <option key={a} value={a}>
          {a}
        </option>
      ))}
    </select>
  );
};
