import React, { Fragment, useState, useEffect } from 'react'; //eslint-disable-line
import PropTypes                                from 'prop-types';
import * as propTypes                           from '../../prop-types';
import { connect }                              from 'react-redux';
import { buildApiUrl, deepPluck }               from '../../utils';
import { faEnvelope, faShareAlt }               from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }                      from '@fortawesome/react-fontawesome';
import * as LINKS                               from '../../data/links';

const styles = {
    url: {
        width: '100%',
        fontWeight: 'bold',
        color: '#000',
        padding: '1rem',
        marginTop: '1rem',
        marginBottom: '1rem',
        wordBreak: 'break-all',
    },
}

export const BuilderActions = (props) => {
    const {
        isDisabled,
        selectedFields,
    } = props;

    const [copied, setIsCopied] = useState();
    const [url, setUrl] = useState();

    const buildUrl = () => {
        return buildApiUrl(deepPluck(selectedFields, 'value'));
    }

    const copyUrl = () => {
        typeof navigator !== `undefined` &&
        navigator.clipboard &&
        navigator.clipboard.writeText(url).then(() => {
            setIsCopied(true);
        });
    }

    const copyQueryLink = () => {
        typeof navigator !== `undefined` &&
        typeof window !== `undefined` &&
        navigator.clipboard &&
        navigator.clipboard.writeText(window.location.href);
    }

    useEffect(() => {
        setIsCopied(false);
        setUrl(buildUrl());
    }, [selectedFields]);

    return (
        <div className="margin-y-4">
            { !isDisabled &&
                <Fragment>
                    <h4>Your API Url:</h4>
                    <div
                        style={styles.url}
                        className='bg-primary-lighter'
                        id='api-url-text'
                    >
                        { url }
                    </div>
                </Fragment>
            }
            { typeof navigator !== `undefined` && navigator.clipboard &&
                <button
                    type='button'
                    title='copy url'
                    className='usa-button'
                    disabled={isDisabled}
                    onClick={copyUrl}
                >
                    Copy Url
                </button>
            }
            { copied &&
                <span
                    className='margin-left-1 text-bold'
                    role='alert'
                >
                    Copied!
                </span>
            }
            <div>
                <h2>Choose a template</h2>
                <a href={LINKS.GOOGLE_SHEETS_LINK} target="_blank" className='usa-link'>
                    Pull data into Google Sheets
                </a>
                <a href={LINKS.EXCEL_LINK} target="_blank" className='usa-link margin-left-2'>
                    Pull data into Microsoft Excel
                </a>
            </div>
            <p className='margin-top-4'>
               Share your query builder settings by copying the page's url
            </p>
        </div>
    );
};

BuilderActions.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    selectedFields: propTypes.SelectedFieldsPropTypes.isRequired,
};

export function mapStateToProps(state) {
    return {
        isDisabled: !Object.keys(state.selectedFields).length,
        selectedFields: state.selectedFields,
    };
}

export function areStatesEqual(prev, next) {
    return prev.selectedFields === next.selectedFields;
}

export default connect(
    mapStateToProps,
    null,
    null,
    { areStatesEqual }
)(BuilderActions);
