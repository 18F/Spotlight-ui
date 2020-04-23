import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { merge } from 'lodash';
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
    const filterName = Object.keys(filter)[0];
    if (filter[filterName] == '') {
      dispatchQuery({
        type: `REMOVE_FILTERS`,
        filtersToRemove: [filterName],
      });
    } else {
      // console.log(query, filter, merge(query, { filters: filter }));
      dispatchQuery({
        type: `APPLY_FILTER`,
        newFilter: { filters: filter },
      });
    }
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
    <FilterForm agencies={agencies} handleFilterChange={handleFilterChange} />
  );
};

export default ReportFilters;

const AgenciesFilter = ({ agenciesList, handleFilterChange }) => {
  return (
    <>
      <label htmlFor="agency">Agency</label>
      <select
        name="agency"
        id="agency"
        onChange={(e) =>
          handleFilterChange({ [e.target.name]: e.target.value })
        }
      >
        {agenciesList.length == 0
          ? null
          : agenciesList.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
      </select>
    </>
  );
};

const DomainFilter = ({ handleFilterChange }) => {
  return (
    <>
      <label htmlFor="domain">Domain</label>
      <input
        type="text"
        id="domain"
        name="domain"
        onChange={(e) =>
          handleFilterChange({ [e.target.name]: `${e.target.value}*` })
        }
      />
    </>
  );
};

const FilterForm = ({ agencies, handleFilterChange }) => {
  return (
    <form onSubmit={(e) => e.preventDefault}>
      <DomainFilter handleFilterChange={handleFilterChange} />
      <AgenciesFilter
        agenciesList={agencies}
        handleFilterChange={handleFilterChange}
      />
    </form>
  );
};
