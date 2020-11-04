import React                         from 'react'; // eslint-disable-line
import PropTypes                     from 'prop-types';
import { bindActionCreators }        from 'redux';
import { connect }                   from 'react-redux';
import { groupBy, orderBy, sortBy }  from 'lodash';
import { faTimesCircle }             from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }           from '@fortawesome/react-fontawesome';
import { unselectField }             from '../../redux/ducks/selectedFields';
import FIELD_CATEGORY_ORDER          from '../../data/field-category-order';

const SelectedFieldGroup = (props) => {
    const fieldsOrdered = orderBy(props.fields, ['order'], ['asc']);
    return (
      <div>
        <h4>{props.groupName}</h4>
        <div className="margin-bottom-3 margin-top-1">
            { fieldsOrdered.map(field => (
                <button
                    role='button'
                    aria-controls={field.title}
                    key={`button_${field.attribute}`}
                    className="usa-button usa-button--outline margin-bottom-2 margin-right-2"
                    onClick={() => props.onClickField(field)}
                >
                    { field.title }{ field.value && `: ${field.value}`}
                    <span style={{ marginLeft: '0.5rem' }}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </span>
                </button>
            ))}
        </div>
      </div>
    );
}

SelectedFieldGroup.propTypes = {
    groupName: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string,
        title: PropTypes.string,
    })).isRequired,
}

const SelectedFields = (props) => {
    const groups = groupBy(Object.values(props.selectedFields), 'category');
    const sortedGroupKeys = sortBy(Object.keys(groups), key => FIELD_CATEGORY_ORDER[key]);
    return (
        <div className="right margin-left-6 margin-right-6">
            <h1>Your Selections</h1>
            { !Object.keys(props.selectedFields).length &&
                <div>You have nothing selected from available fields.</div>
            }
            { sortedGroupKeys.map(key => (
                <SelectedFieldGroup
                    key={groups[key][0].category}
                    groupName={groups[key][0].category}
                    fields={groups[key]}
                    onClickField={props.actions.unselectField}
                />
            )) }
        </div>
    );
};

SelectedFields.propTypes = {
    selectedFields: PropTypes.objectOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        attribute: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
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

