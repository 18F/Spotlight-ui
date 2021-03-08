import React, { Fragment } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import QueryBuilder from '../components/modules/query-builder';

const IndexPage = () => (
    <Fragment>
        <SEO title="Site-Scanning Query Builder" />
        <QueryBuilder />
    </Fragment>
)

export default IndexPage;
