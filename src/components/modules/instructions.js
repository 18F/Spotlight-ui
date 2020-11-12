import React, { Fragment } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import Accordion from '../uswds/accordion';

const Instructions = (props) => {
    const items = [{
        id: 'how_it_works',
        heading: 'How It Works',
        content:
            <div className='grid-container'>
                <div className='grid-row grid-gap'>
                    <div className='grid-col display-flex'>
                        <h3 className='margin-right-2'>1.</h3>
                        <p>Select the fields and filters you want from the list of available fields.</p>
                    </div>
                    <div className='grid-col display-flex'>
                        <h3 className='margin-right-2'>2.</h3>
                        <p>Copy the generated URL</p>
                    </div>
                    <div className='grid-col display-flex'>
                        <h3 className='margin-right-2'>3.</h3>
                        <p>Use this URL in our <a href="#">Google Sheets</a> or <a href="#">Microsoft Excel</a> template to pull our data into your spreadsheet!</p>
                    </div>
                </div>
            </div>
    }]
    return (
        <Fragment>
            <h1>Site Scanning Query Builder</h1>
            <Accordion items={items} customStyles={{
                content: {
                    backgroundColor: '#efefef',
                }
            }}/>
        </Fragment>
    );
};

Instructions.propTypes = {};

export default Instructions;
