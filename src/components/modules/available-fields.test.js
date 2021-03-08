import React                         from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '../../test-utils';
import { act }                       from 'react-dom/test-utils';
import { orderBy }                   from 'lodash';
import { AvailableFields }           from './available-fields';
import FIELD_OPTIONS                 from '../../data/fields';

describe('<AvailableFields />', function() {
    test('fields are ordered according to specified order', async () => {
        const { container } = render(<AvailableFields selectedFields={{}} />);

        const expectedLabels = container.querySelectorAll('label');

        const fieldTitlesOrdered = orderBy(
            Object.values(FIELD_OPTIONS).filter(field => field.live),
            ['order'], ['asc']
        ).map(field => field.title);

        expectedLabels.forEach(function(label, index) {
            expect(label.innerHTML).toMatch(fieldTitlesOrdered[index]);
        });
    });
});
