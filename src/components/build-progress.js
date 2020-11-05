import React                  from 'react'; //eslint-disable-line
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Progress }           from 'semantic-ui-react';
import 'semantic-ui-css/components/progress.css';

const BuildProgress = (props) => {
    return (
        <div className="margin-top-4" style={{ maxWidth: '400px' }}>
            <Progress percent={props.percent || 50} indicating>
                Loading
            </Progress>
        </div>
    );
};

BuildProgress.propTypes = {
    percent: PropTypes.number.isRequired,
};

export function mapStateToProps(state) {
    return {};
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
        // add action creators here
        }, dispatch)
    };
}

export function areStatesEqual(prev, next) {
    // return true;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { areStatesEqual }
)(BuildProgress);
