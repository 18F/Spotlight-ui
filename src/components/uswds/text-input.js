import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

const TextInput = (props) => {
    return (
        <input
            className="usa-input"
            id={props.id}
            name={props.name}
            aria-label={props.ariaLabel || props.name}
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder || ''}
        />
    );
};

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    ariaLabel: PropTypes.string,
};

export default TextInput;
