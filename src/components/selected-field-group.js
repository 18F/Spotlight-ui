import React                         from 'react'; // eslint-disable-line
import PropTypes                     from 'prop-types';
import * as propTypes                from '../prop-types';
import { orderBy }                   from 'lodash';
import { faTimesCircle }             from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }           from '@fortawesome/react-fontawesome';

const SelectedFieldGroup = (props) => {
    const fieldsOrdered = orderBy(props.fields, ['order'], ['asc']);
    return fieldsOrdered.map(field => (
        <div
            className='margin-bottom-1'
            key={`remove_${field.attribute}`}
        >
            <button
                type='button'
                className='usa-button usa-button--unstyled margin-right-1'
                onClick={() => props.onClickField(field)}
                title={`Remove ${field.title} filter`}
            >
                <FontAwesomeIcon icon={faTimesCircle} />
            </button>
            { field.title }{ field.value && `:`}{ field.value && <span className="margin-left-1 text-bold">{field.value}</span>}
        </div>
    ));
}

SelectedFieldGroup.propTypes = {
    groupName: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(propTypes.SelectedFieldPropTypes).isRequired,
}

export default SelectedFieldGroup;
