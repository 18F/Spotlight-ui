import PropTypes from 'prop-types';

export const AvailableFieldPropTypes = PropTypes.shape({
    category: PropTypes.string.isRequired,
    attribute: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    order: PropTypes.number,
    query_type: PropTypes.oneOf(['equals', 'boolean']),
    input: PropTypes.oneOf(['text', 'select']),
    input_options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
    })),
    live: PropTypes.boolean,
});

export const AvailableFieldsPropTypes = PropTypes.arrayOf(AvailableFieldPropTypes);

export const SelectedFieldPropTypes = PropTypes.shape({
    category: PropTypes.string.isRequired,
    attribute: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
});

export const SelectedFieldsPropTypes = PropTypes.objectOf(SelectedFieldPropTypes);

