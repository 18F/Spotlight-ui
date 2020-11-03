import React  from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

export const AccordionItem = (props) => {
  const { heading, id, content, expanded, handleToggle } = props

  return (
    <>
      <h2 className='usa-accordion__heading'>
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
        hidden={!expanded}>
        {content}
      </div>
    </>
  )
}

AccordionItem.propTypes = {
    content: PropTypes.object,
    expanded: PropTypes.bool,
    handleToggle: PropTypes.func.isRequired,
    heading: PropTypes.string,
    id: PropTypes.string,
};

export default AccordionItem;
