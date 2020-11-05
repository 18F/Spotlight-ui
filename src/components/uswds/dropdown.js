import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

const Dropdown = (props) => {
    return (
        <select
            className="usa-select"
            name={props.name}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            aria-label={props.ariaLabel || props.name}
        >
            <option value=''>- Select -</option>
            { props.options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    { option.label }
                </option>
            ))}
        </select>
    );
};

Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
    })),
    ariaLabel: PropTypes.string,
};

export default Dropdown;
