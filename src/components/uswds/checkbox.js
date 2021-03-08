import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

const Checkbox = (props) => {
    return (
        <div className="usa-checkbox">
            <input
                className="usa-checkbox__input"
                type="checkbox"
                id={props.id}
                name={props.name}
                checked={props.checked}
                onChange={props.onChange}
            />
            <label
                className="usa-checkbox__label"
                htmlFor={props.id}
            >
                { props.label}
            </label>
        </div>
    );
};

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;
