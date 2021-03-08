import React               from 'react'; // eslint-disable-line
import PropTypes           from 'prop-types';
import * as propTypes      from '../prop-types';
import { connect }         from 'react-redux';
import Checkbox            from './uswds/checkbox';
import TextInput           from './uswds/text-input';
import Dropdown            from './uswds/dropdown';
import { faFilter }        from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AvailableField = (props) => {
    const { attribute, title, input, input_options } = props.field;
    const { value } = props;
    return (
        <div>
            { input &&
                <div className='margin-bottom-2'>
                    <label
                        className="usa-label"
                        htmlFor={attribute}>
                        { title }
                    </label>
                    { input === 'text' &&
                        <TextInput
                            id={attribute}
                            name={attribute}
                            ariaLabel={`Enter ${title}`}
                            placeholder={`Enter ${title}`}
                            value={value}
                            onChange={props.onFieldChange}
                        />
                    }
                    { input === 'select' &&
                        <Dropdown
                            id={`filter_by_${attribute}`}
                            name={`Filter by ${title}`}
                            ariaLabel={`Filter by ${title}`}
                            value={value}
                            onChange={props.onFieldChange}
                            options={input_options}
                        />
                    }
                </div>
            }
        </div>
    );
};

AvailableField.propTypes = {
    field: propTypes.AvailableFieldPropTypes.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.any,
};

const mapStateToProps = (state, ownProps) => ({
    value: state.selectedFields[ownProps.field.attribute] ? state.selectedFields[ownProps.field.attribute].value : '',
});

const areStatesEqual = (prev, next) => (
    prev.selectedFields === next.selectedFields
);

export default connect(
    mapStateToProps,
    null,
    null,
    { areStatesEqual },
)(AvailableField);
