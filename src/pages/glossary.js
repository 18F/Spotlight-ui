import React, { Fragment } from 'react'; //eslint-disable-line
import PropTypes           from 'prop-types';
import { sortBy }          from 'lodash';
import * as propTypes      from '../prop-types';
import FIELD_OPTIONS       from '../data/fields';

const Glossary = (props) => {
    return (
        <section className='usa-section'>
            <div className='grid-container usa-prose'>
                <h1>Site-Scanning Glossary</h1>
                { sortBy(props.availableFields, ['order', 'asc']).map(field => (
                    <Fragment>
                        <h2>{ field.title }</h2>
                        <p>{ field.definition }</p>
                        { field.method &&
                            <Fragment>
                                <h3>How the scanner gets this data</h3>
                                <p>{ field.method }</p>
                            </Fragment>
                        }
                    </Fragment>
                ))}
            </div>
        </section>
    );
};

Glossary.propTypes = {
    availableFields: propTypes.AvailableFieldsPropTypes.isRequired,
};

Glossary.defaultProps = {
    availableFields: Object.values(FIELD_OPTIONS).filter(field => field.live),
}

export default Glossary;
