import React, { Fragment, useEffect } from 'react'; // eslint-disable-line
import * as propTypes                 from '../../prop-types';
import { bindActionCreators }         from 'redux';
import { connect }                    from 'react-redux';
import { groupBy, orderBy, sortBy }   from 'lodash';
import FIELD_OPTIONS                  from '../../data/fields';
import Accordion                      from '../uswds/accordion';
import Checkbox                       from '../uswds/checkbox';
import AvailableField                 from '../available-field';
import {
    selectField, unselectField, setFieldValue,
}                                     from '../../redux/ducks/selectedFields';
import FIELD_CATEGORY_ORDER           from '../../data/field-category-order';
import { TERMS_LINK }                 from '../../data/links';

export const AvailableFields = (props) => {
    const availableGroups = selectedFields => groupBy(selectedFields, 'category');
    const groups = availableGroups(props.availableFields);
    const sortedGroupKeys = sortBy(Object.keys(groups), key => FIELD_CATEGORY_ORDER[key]);
    const sanitizeField = field => ({
        ...field,
        input_options: undefined,
    })
    const handleOnFieldChange = (field, e) => {
        props.actions.setFieldValue({
            ...sanitizeField(field),
            value: e.target.value.trim(),
        });
        !e.target.value.trim().length && props.actions.unselectField(field);
    }
    const groupAllChecked = (groupName) => {
        const filterByGroup = field => field.category === groupName;
        return Object.values(props.selectedFields).filter(filterByGroup).length ===
            Object.values(props.availableFields).filter(filterByGroup).length;
    }
    return (
        <div className='usa-section usa-section--dark padding-2'>
            <div className='tablet:display-flex flex-align-center flex-justify'>
                <h2>
                    Filters
                </h2>
                <a href={TERMS_LINK} target='_blank'>
                    What are these filters?
                </a>
            </div>
            { sortedGroupKeys.map(key => {
                return orderBy(groups[key], ['order'], ['asc']).map(field => (
                    <AvailableField
                        key={field.attribute}
                        field={field}
                        checked={!!props.selectedFields[field.attribute]}
                        onFieldChange={(e) => handleOnFieldChange(field, e) }
                    />
                ))
            })}
        </div>
    );
};

AvailableFields.propTypes = {
    availableFields: propTypes.AvailableFieldsPropTypes.isRequired,
    selectedFields: propTypes.SelectedFieldsPropTypes.isRequired,
};

AvailableFields.defaultProps = {
    availableFields: Object.values(FIELD_OPTIONS).filter(field => field.live),
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
