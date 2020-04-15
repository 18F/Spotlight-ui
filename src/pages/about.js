import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="About" /> 
  <h1>About Site Scanner</h1>
    <h3>Site Scanner is a website scanner for federal government professionals. It is currently available for free through the support of General Service Administration's <a href="https://10x.gsa.gov/">10x program</a>.</h3>
   <p>The vision of Site Scanner is to offer an automated solution to website scanning that gives anyone in the federal government easy assess to the most critical data for excellent federal websites and informed actions. Site Scanner is a reference tool. That means that it focuses on delivering data you need to learn which web hygiene practices and user-friendly designs are present on a federal website. These indicators of excellence are derived from industry standards, federal laws, and user needs. By referencing this data, you're able to connect which particular features lead to successful federal websites. Use this information to make your great existing website even better, focus your resources on other more pressing issues, or start your new website off on the right foot. Ultimately, the aim of Site Scanner is to inform users with critical data and encourage excellent federal websites, which we believe leads to the delivery of excellent digital services for the public and public servants.</p>
  
  <h2>Who we are</h2>
  <p>Site Scanner is built and maintained by a team within <a href="https://18f.gsa.gov/">18F</a>and supported by<a href="https://10x.gsa.gov/">10x</a>. 10x funds and develops ideas from federal employees that use technology to improve government. Both 10x and 18F are part of the U.S. General Services Administration <a href="https://www.gsa.gov/about-us/organization/federal-acquisition-service/technology-transformation-services">Technology Transformation Services (TTS)</a> portfolio.
  
  <h3>Access Site Scanner for free</h3>
    <p></p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
