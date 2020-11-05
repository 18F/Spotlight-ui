import React                  from 'react'; //eslint-disable-line
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import BuildProgress          from '../build-progress';

const BuilderActions = (props) => {

    const buildReport = () => {
        // TODO: implement API action
    }

    return (
        <div className="margin-y-4">
            <button
                className='usa-button usa-button--big'
                disabled={props.isDisabled || props.buildRequesting}
                onClick={buildReport}
            >
                Build Report
            </button>
            { props.buildRequesting &&
                <BuildProgress />
            }
            { props.buildSuccess &&
                <div className="margin-top-3" id="success">
                    <div className="usa-alert usa-alert--success margin-bottom-2" >
                        <div class="usa-alert__body">
                            <h3 className="usa-alert__heading">
                                Success!
                            </h3>
                            <p className="usa-alert__text">
                                Your report is ready
                            </p>
                        </div>
                    </div>
                    <button class="usa-button">
                          Download CSV
                    </button>
                    <button class="usa-button usa-button--outline" >
                          Share Link to Report
                    </button>
                </div>
            }
            { props.buildFail &&
                <div className="margin-top-3" id="fail">
                    <div className="usa-alert usa-alert--error" >
                        <div class="usa-alert__body">
                            <h3 className="usa-alert__heading">
                                Build Failed
                            </h3>
                            <p className="usa-alert__text">
                                Error: { props.buildErrorMessage }
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
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
        // add action creators here
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
