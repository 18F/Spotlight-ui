import React, { useState, useEffect } from "react"
import Scan from "../components/scan"

export default () => (
  <>
    <h1>Information for Privacy Officers</h1>
    <Scan scanType={"privacy"} />
  </>
)
