import React    from 'react';
import { Link } from 'gatsby';
import Layout   from '../components/layout';
import SEO      from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <div className='usa-section grid-container text-center'>
        <SEO title="404: Not found" />
        <h1>404</h1>
        <h2>Your page cannot be found.</h2>
        <p><Link to='/'>Return to Homepage</Link></p>
    </div>
  </Layout>
);

export default NotFoundPage;
