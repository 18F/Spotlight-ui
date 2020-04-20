import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Contact us" /> 
  <h1>Contact us</h1>
  
 <p>For general questions and comments about how Site Scanner works or scan results, please >a ref="mailto:site-scanning@gsa.gov">email the team</a>.</p>
  
  <p>If you have questions about analyzing and taking action on specific Site Scanner results, check out <a ref="https://digital.gov/services/directory/">Digital.gov's Registry of services</a> to find further points of contact.
  </Layout>
)

export default SecondPage
