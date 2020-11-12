import React, { useState, useEffect } from 'react'; //eslint-disable-line
import PropTypes                      from 'prop-types';
import { connect }                    from 'react-redux';
import { bindActionCreators }         from 'redux';
import BuildProgress                  from '../build-progress';

const BuilderActions = (props) => {
    const {
        isDisabled,
        buildRequesting,
        buildSuccess,
        buildFail,
        buildErrorMessage,
        selectedFields,
    } = props;

    const [copied, setIsCopied] = useState();

    useEffect(() => {
        setIsCopied(false);
    }, [selectedFields]);

    const copyUrl = () => {
        setIsCopied(true);
    }

    return (
        <div className="margin-y-4">
            <button
                className='usa-button usa-button--big'
                disabled={isDisabled || buildRequesting}
                onClick={copyUrl}
            >
                Copy URL
            </button>
            { copied && <span className='margin-left-1 text-bold'>Copied!</span> }
            <div>
                <h4>Now choose a template:</h4>
                <p>
                    <a className='' href="#" target="_blank">
                        Go to Google Sheets
                    </a>
                </p>
                <p>
                    <a className='' href="#" target="_blank">
                        Go to Microsoft Excel
                    </a>
                </p>
            </div>
            { buildRequesting &&
                <BuildProgress />
            }
            { buildSuccess &&
                <div className="margin-top-3" id="success">
                    <div className="usa-alert usa-alert--success margin-bottom-2" >
                        <div class="usa-alert__body">
                            <h3 className="usa-alert__heading">
                                Success!
                            </h3>
                            <p className="usa-alert__text">
                                Your Query is ready
                            </p>
                        </div>
                    </div>
                    <button class="usa-button">
                          Copy API Url
                    </button>
                    <button class="usa-button usa-button--outline" >
                          Copy Link To Query
                    </button>
                </div>
            }
            { buildFail &&
                <div className="margin-top-3" id="fail">
                    <div className="usa-alert usa-alert--error" >
                        <div class="usa-alert__body">
                            <h3 className="usa-alert__heading">
                                Build Failed
                            </h3>
                            <p className="usa-alert__text">
                                Error: { buildErrorMessage }
                            </p>
                            <p className="usa-alert__text">
                                Please try again or contact us.
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

BuilderActions.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    buildRequesting: PropTypes.bool.isRequired,
    buildSuccess: PropTypes.bool.isRequired,
    buildFail: PropTypes.bool.isRequired,
    buildErrorMessage: PropTypes.string,
};

export function mapStateToProps(state) {
    return {
        isDisabled: !Object.keys(state.selectedFields).length,
        buildRequesting: false, // TODO: set value from state
        buildSuccess: false, // TODO: set value from state
        buildFail: false, // TODO: set value from state
        buildErrorMessage: "",
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
