import React, { useEffect, useState } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import AccordionItem from './accordion-item';

const Accordion = (props) => {
    const { items, customStyles } = props;

    const [openItems, setOpenState] = useState(
        items.filter((i) => !!i.expanded).map((i) => i.id)
    )

    const toggleItem = itemId => {
        const newOpenItems = [...openItems]
        const itemIndex = openItems.indexOf(itemId)

        if (itemIndex > -1) {
          newOpenItems.splice(itemIndex, 1)
        } else {
          newOpenItems.push(itemId)
        }

        setOpenState(newOpenItems)
    }

    useEffect(()=>{
      props.defaultExpandedId && toggleItem(props.defaultExpandedId)
    },[])

  return (
    <div className='usa-accordion'>
      { items.map((item, i) => (
        <AccordionItem
          key={`accordionItem_${i}`}
          { ...item }
          expanded={ openItems.indexOf(item.id) > -1 }
          handleToggle={ () => toggleItem(item.id) }
          customStyles={customStyles}
        />
      )) }
    </div>
  )
};

Accordion.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        heading: PropTypes.string,
        content: PropTypes.object,
    })),
    defaultExpandedId: PropTypes.string,
    customStyles: PropTypes.shape({
      heading: PropTypes.object,
      content: PropTypes.object,
    }),
};

export default Accordion;
