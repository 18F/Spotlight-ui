import React               from 'react'; // eslint-disable-line
import PropTypes           from 'prop-types';
import Checkbox            from './uswds/checkbox';
import TextInput           from './uswds/text-input';
import Dropdown            from './uswds/dropdown';
import { faFilter }        from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AvailableField = (props) => {
    const { attribute, title, input, value, input_options } = props.field;
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
    field: PropTypes.shape({
        category: PropTypes.string.isRequired,
        attribute: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number,
        query_type: PropTypes.string,
        input: PropTypes.string,
        value: PropTypes.any,
    }),
    checked: PropTypes.bool,
    onFieldChange: PropTypes.func.isRequired,
};

export default AvailableField;
