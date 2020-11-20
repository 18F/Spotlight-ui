import React, { Fragment } from 'react'; // eslint-disable-line

const Instructions = (props) => {
    const items = [{
        id: 'how_it_works',
        heading: 'How It Works',
        content:
            <div className='grid-container'>
                <div className='grid-row grid-gap'>
                    <div className='grid-col display-flex'>
                        <h3 className='margin-right-2'>1.</h3>
                        <p>Select the filters you want.</p>
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
            <div className="usa-alert usa-alert--warning usa-alert--slim" >
              <div className="usa-alert__body">
                <p className="usa-alert__text"><strong>This site is in Beta</strong>. Help us improve it by emailing <em>site-scanning@gsa.gov</em></p>
              </div>
            </div>
            <h1>Site Scanning Query Builder</h1>
            <h2>How it Works</h2>
            <ol >
                <li>
                    Set the filters you want
                </li>
                <li>
                    Copy the generated URL
                </li>
                <li>
                    Use this URL in our <a href="#">Google Sheets</a> or <a href="#">Microsoft Excel</a> template to pull the data into a spreadsheet!
                </li>
            </ol>
        </Fragment>
    );
};

Instructions.propTypes = {};

export default Instructions;
