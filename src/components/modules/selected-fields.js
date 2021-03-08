import React                         from 'react'; // eslint-disable-line
import PropTypes                     from 'prop-types';
import * as propTypes                from '../../prop-types';
import { bindActionCreators }        from 'redux';
import { connect }                   from 'react-redux';
import { groupBy, sortBy }           from 'lodash';
import { unselectField }             from '../../redux/ducks/selectedFields';
import FIELD_CATEGORY_ORDER          from '../../data/field-category-order';
import SelectedFieldGroup            from '../selected-field-group';

const SelectedFields = (props) => {
    const groups = groupBy(Object.values(props.selectedFields), 'category');
    const sortedGroupKeys = sortBy(Object.keys(groups), key => FIELD_CATEGORY_ORDER[key]);
    const clearAll = () => {
        Object.values(props.selectedFields).forEach(field => {
            props.actions.unselectField(field);
        });
    }
    return (
        <div>
            <h2>Your Selections</h2>
            { !Object.keys(props.selectedFields).length &&
                <div>You have nothing selected from available filters.</div>
            }
            { sortedGroupKeys.map(key => (
                <SelectedFieldGroup
                    key={groups[key][0].category}
                    groupName={groups[key][0].category}
                    fields={groups[key]}
                    onClickField={props.actions.unselectField}
                />
            )) }
            { !!Object.keys(props.selectedFields).length &&
                <button
                    type='button'
                    className='usa-button usa-button--unstyled'
                    title='clear all selections'
                    onClick={clearAll}
                >
                    Clear All
                </button>
            }
        </div>
    );
};

SelectedFields.propTypes = {
    selectedFields: propTypes.SelectedFieldsPropTypes.isRequired,
};

const mapStateToProps = (state) => ({
    selectedFields: state.selectedFields,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        unselectField,
    }, dispatch)
});

const areStatesEqual = (prev, next) => (
    prev.selectedFields === next.selectedFields
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { areStatesEqual },
)(SelectedFields);

