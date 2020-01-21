import React from "react"

export default ({ handleFilterQuery }) => {
  return (
    <form>
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
    </form>
  )
}
