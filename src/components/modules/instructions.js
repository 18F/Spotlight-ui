import React, { Fragment } from 'react'; // eslint-disable-line
import * as LINKS          from '../../data/links';

const Instructions = (props) => {
    return (
        <Fragment>
            <div className="usa-alert usa-alert--warning usa-alert--slim" >
              <div className="usa-alert__body">
                <p className="usa-alert__text">
                    <strong>This site is in Beta</strong>. Help us improve it by emailing site-scanning@gsa.gov
                </p>
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
                    Use this URL in our <a href={LINKS.GOOGLE_SHEETS_LINK} target='_blank' className='usa-link'>Google Sheets</a> or <a href={LINKS.EXCEL_LINK} target='_blank' className='usa-link'>Microsoft Excel</a> template to pull the data into a spreadsheet!
                </li>
            </ol>
        </Fragment>
    );
};

Instructions.propTypes = {};

export default Instructions;
