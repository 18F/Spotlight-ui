import React, { Fragment }  from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

export const AccordionItem = (props) => {
  const {
    heading,
    id,
    content,
    expanded,
    handleToggle,
    customStyles,
  } = props

  return (
    <Fragment>
      <h2
        className='usa-accordion__heading'
        style={customStyles && customStyles.heading ? customStyles.heading : {}}
      >
        <button
          type="button"
          className="usa-accordion__button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={handleToggle}>
          {heading}
        </button>
      </h2>
      <div
        id={id}
        className='usa-accordion__content usa-prose'
        hidden={!expanded}
        style={customStyles && customStyles.content ? customStyles.content : {}}
      >
        {content}
      </div>
    </Fragment>
  )
}

AccordionItem.propTypes = {
    content: PropTypes.object,
    expanded: PropTypes.bool,
    handleToggle: PropTypes.func.isRequired,
    heading: PropTypes.string,
    id: PropTypes.string,
    customStyles: PropTypes.shape({
      heading: PropTypes.object,
      content: PropTypes.object,
    }),
};

export default AccordionItem;
