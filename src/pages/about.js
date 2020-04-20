import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="About" /> 
  <h1>About Site Scanner</h1>
    <h3>Site Scanner is a website scanner for federal government professionals. It is currently available for free through the support of General Service Administration's <a href="https://10x.gsa.gov/">10x program</a>.</h3>

   <h2>What is Site Scanner?</h2>
  <p>We believe excellent federal websites lead to the delivery of excellent digital services for the public and public servants. So we built Site Scanner as a reference tool you use to instantly access data on the big picture of what's working really well on federal websites. Data indicating the most critical web hygiene and user-friendly features present on a federal website. These top features of excellence are distilled from industry standards, federal laws, and user needs. Site Scanner aims to help you determine which particular features lead to successful federal websites so you can best prioritize your resources.</p>
 
  <p>Site Scanner is an open-source tool that runs on <a ref="https://cloud.gov/">cloud.gov</a>. The core of Site Scanner is a scanning engine that performs a series of scans that each check for a particular feature on each individual website included in a continously-updated list of federal domains and subdomains. Some scans are run using a plug-in called <a ref="https://developers.google.com/web/tools/lighthouse">Google Lighthouse</a>. Others are run using custom code. Scanning happens each night and takes about 4 minutes to complete. Then, Site Scanner compiles all the scan results into simple data files called <a ref="https://www.json.org/json-en.html">JSON</a>.To access these JSON files, users cpull the data into their own system by using the Site Scanner API, or by engaging directly on the Site Scanner results page. You can explore the code on <a ref="https://github.com/18F/site-scanning">Site Scanner's public Github repository</a>.</p>
  
  <h2>The Site Scanner team</h2>
  <p>Site Scanner is built and maintained by a team within <a href="https://18f.gsa.gov/">18F</a>and supported by<a href="https://10x.gsa.gov/">10x</a>. 10x funds and develops ideas from federal employees that use technology to improve government. Both 10x and 18F are part of the U.S. General Services Administration <a href="https://www.gsa.gov/about-us/organization/federal-acquisition-service/technology-transformation-services">Technology Transformation Services (TTS)</a> portfolio.</p>

    <Link to="/">Access Site Scanner scan results</Link>
  </Layout>
)

export default SecondPage
