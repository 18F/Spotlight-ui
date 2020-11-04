import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import Checkbox from './uswds/checkbox';
import TextInput from './uswds/text-input';
import Dropdown from './uswds/dropdown';

const AvailableField = (props) => {
    const { attribute, title, input, value, input_options } = props.field;
    return (
        <div>
            <Checkbox
                key={attribute}
                id={`select_${attribute}`}
                label={title}
                name={attribute}
                checked={props.checked}
                onChange={props.onSelectChange}
            />
            { props.checked && input &&
                <div className='margin-left-4 margin-top-1 margin-bottom-2'>
                { input === 'text' &&
                    <TextInput
                        id={`filter_by_${attribute}`}
                        name={`filter_by_${attribute}`}
                        placeholder={`Filter by ${title}`}
                        value={value}
                        onChange={props.onFieldChange}
                    />
                }
                { input === 'select' &&
                    <Dropdown
                        id={`filter_by_${attribute}`}
                        name={`filter_by_${attribute}`}
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
    onSelectChange: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
};

export default AvailableField;
