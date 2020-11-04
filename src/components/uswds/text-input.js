import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

const TextInput = (props) => {
    return (
        <input
            className="usa-input"
            // aria-describedby="with-hint-input-info with-hint-input-hint"
            id={props.id}
            name={props.name}
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
};

export default TextInput;
