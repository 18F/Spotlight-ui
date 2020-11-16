import React, { useState, useEffect } from 'react'; //eslint-disable-line
import PropTypes                      from 'prop-types';
import { connect }                    from 'react-redux';
import { bindActionCreators }         from 'redux';
import { buildApiUrl, buildQueryUrl } from '../../utils';
import { faEnvelope, faShareAlt }     from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }            from '@fortawesome/react-fontawesome';

const styles = {
    url: {
        width: '100%',
        backgroundColor: '#efefef',
        fontWeight: 'bold',
        color: '#000',
        padding: '1rem',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
}

const BuilderActions = (props) => {
    const {
        isDisabled,
        selectedFields,
    } = props;

    const [copied, setIsCopied] = useState();
    const [url, setUrl] = useState();

    const buildUrl = () => {
        const values = Object.keys(selectedFields).reduce((acc, key)=> {
            acc[key] = selectedFields[key].value;
            return acc;
        }, {});
        return buildApiUrl(values);
    }

    const copyUrl = () => {
        navigator &&
        navigator.clipboard &&
        navigator.clipboard.writeText(url).then(() => {
            setIsCopied(true);
        });
    }

    const copyQueryLink = () => {
        const values = Object.keys(selectedFields).reduce((acc, key)=> {
            acc[key] = selectedFields[key].value;
            return acc;
        }, {});
        navigator &&
        navigator.clipboard &&
        navigator.clipboard.writeText(buildQueryUrl(values));
    }

    useEffect(() => {
        setIsCopied(false);
        setUrl(buildUrl());
    }, [selectedFields]);

    return (
        <div className="margin-y-4">
            { !navigator || (navigator && !navigator.clipboard) &&
                <div
                    disabled
                    style={styles.url}
                >
                    { url }
                </div>
            }
            { navigator && navigator.clipboard &&
                <button
                    className='usa-button usa-button--big'
                    disabled={isDisabled}
                    onClick={copyUrl}
                >
                    Copy URL
                </button>
            }
            { copied && <span className='margin-left-1 text-bold'>Copied!</span> }
            <div>
                <h4>Choose a template:</h4>
                    <a href="#" target="_blank">
                        Pull data into Google Sheets
                    </a>
                    <a href="#" target="_blank" className='margin-left-2'>
                        Pull data into Microsoft Excel
                    </a>
            </div>
            <div className='margin-top-4'>
                <span className='margin-right-2'>Share your query:</span>
                <button
                    className='usa-button usa-button--outline'
                    onClick={copyQueryLink}
                    title='Copy query link'
                >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faShareAlt}
                    />
                </button>
                <button
                    className='usa-button usa-button--outline'
                    onClick={() => {}} // TODO: implement
                    title='Email this query'
                >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faEnvelope}
                    />
                </button>
                <button
                    className='usa-button usa-button--outline'
                    onClick={() => {}} // TODO: implement
                    title='post this query to Twitter'
                >
                    Twitter
                </button>

            </div>
        </div>
    );
};

BuilderActions.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    selectedFields: PropTypes.objectOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        attribute: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
};

export function mapStateToProps(state) {
    return {
        isDisabled: !Object.keys(state.selectedFields).length,
        selectedFields: state.selectedFields,
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            // Add actions here
        }, dispatch)
    };
}

export function areStatesEqual(prev, next) {
    return prev.selectedFields === next.selectedFields;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { areStatesEqual }
)(BuilderActions);
