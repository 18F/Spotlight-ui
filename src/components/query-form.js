import React from "react"

export default ({ scanDates, agencies, handleFilterQuery }) => {
  const addOptionAll = optionsArr => {
    const emptyOpt = 'All';
    return [emptyOpt, ...optionsArr]
  }

  agencies = addOptionAll(agencies).map(a => {
    const value = a === `All` ? `*` : a.replace(/ /g, "+");
    return (
      <option key={a} value={value}>
        {a}
      </option>
    )
  })


  return (
    <form>
      <fieldset>
        <label htmlFor="privacyPagePresent">Privacy Page Present</label>
        <select
          id="privacyPagePresent"
          name="privacyPagePresent"
          onChange={e =>
            handleFilterQuery({ data: { status_code: e.target.value } })
          }
        >
          <option value="200">Present</option>
          <option value="!(200)">Not Present</option>
          <option value="*">All</option>
        </select>

        <label htmlFor="agencies">Filter by agency</label>
        <select
          id="agencies"
          name="agencies"
          onChange={e => handleFilterQuery({ agency: e.target.value })}
        >
          {agencies}
        </select>

        <label htmlFor="scanDate">Filter by Scan Date</label>
        <select name="scanDate" id="scanDate">
          {scanDates.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </fieldset>
    </form>
  )
}
