import React, { Fragment }            from 'react'; // eslint-disable-line
import PropTypes                      from 'prop-types';
import { bindActionCreators }         from 'redux';
import { connect }                    from 'react-redux';
import { groupBy, orderBy, sortBy }   from 'lodash';
import FIELD_OPTIONS                  from '../../data/fields';
import Accordion                      from '../uswds/accordion';
import AvailableField                 from '../available-field';
import {
    selectField, unselectField, setFieldValue,
}                                     from '../../redux/ducks/selectedFields';
import FIELD_CATEGORY_ORDER           from '../../data/field-category-order';

const AvailableFields = (props) => {
    const availableGroups = selectedFields => groupBy(Object.values(selectedFields), 'category');
    const groups = availableGroups(props.availableFields);
    const sortedGroupKeys = sortBy(Object.keys(groups), key => FIELD_CATEGORY_ORDER[key]);
    const sanitizeField = field => ({
        ...field,
        input_options: undefined,
    })
    const handleOnSelectChange = (field) => {
        if (props.selectedFields[field.attribute]) {
            props.actions.unselectField(sanitizeField(field));
        } else {
            props.actions.selectField(sanitizeField(field));
        }
    };
    const handleOnFieldChange = (field, e) => {
        props.actions.setFieldValue({
            ...sanitizeField(field),
            value: e.target.value.trim(),
        });
    }
    const items = sortedGroupKeys.map(key => ({
        id: groups[key][0].category,
        heading: groups[key][0].category,
        content: <Fragment>
            { orderBy(groups[key], ['order'], ['asc']).map(field => (
                <AvailableField
                    key={field.attribute}
                    field={field}
                    checked={!!props.selectedFields[field.attribute]}
                    onSelectChange={() => handleOnSelectChange(field) }
                    onFieldChange={(e) => handleOnFieldChange(field, e) }
                />
            )) }
        </Fragment>,
    }));
    return (
        <div>
            <h2 className='margin-left-2'>
                Available Fields
            </h2>
            <Accordion items={items} />
        </div>
    );
};

AvailableFields.propTypes = {
    availableFields: PropTypes.objectOf(PropTypes.shape({
        category: PropTypes.string,
        attribute: PropTypes.string,
        title: PropTypes.string,
        order: PropTypes.number,
    })),
    selectedFields: PropTypes.objectOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        attribute: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
};

AvailableFields.defaultProps = {
    availableFields: FIELD_OPTIONS,
}

const mapStateToProps = (state) => ({
    selectedFields: state.selectedFields,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        selectField,
        unselectField,
        setFieldValue,
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
)(AvailableFields);
